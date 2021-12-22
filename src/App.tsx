// @ts-nocheck

import "./App.css";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo
} from "react";

//ui
import {Button, makeStyles,	Avatar, IconButton,	createStyles,  Theme} from "@material-ui/core";

//logic
import io from "socket.io-client";
import { DAppClient } from "@airgap/beacon-sdk";
import _ from "underscore";
import {Cursor, Cursors} from './Cursor';

const query_collection = `
query collectorGallery($address: String!) {
  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {creator: {address: {_neq: $address}}}, quantity: {_gt: "0"}}, order_by: {token_id: desc}) {
	token {
	  id
	  artifact_uri
	  display_uri
	  thumbnail_uri
	  timestamp
	  mime
	  title
	  description
	  supply
	  royalties
	  creator {
		address
	  }
	}
  }
}
`

const socketURL =
  window.location.hostname === "localhost"
    ? "ws://localhost:8000"
    : "wss://peopleparty-server.herokuapp.com";

const socket = io(socketURL, { transports: ["websocket"] });
const dAppClient = new DAppClient({ name: "Beacon Docs" });
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
  },
  sizeBig: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  sizeSmall: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}),
);

function App() {

  const classes = useStyles();
  const [activeAccount, setActiveAccount] = useState();
	const [synced, setSynced] = useState('sync');
	const [showUnsync, setShowUnsync] = useState(false);
  const isMobile = window.innerWidth <= 500;
	const [showPanel, setShowPanel] = useState(false);
	const [collections, setCollections] = useState([]);
  const [username, setUsername] = useState("anon");
  const [avatar, setAvatar] = useState("https://ipfs.io/ipfs/QmVAiRHjVLPJYnf7jCpVeqrqRBE7HFN9nm5ZB2QSZ5BY52");
  const userCursorRef = React.createRef<HTMLDivElement>();
	const [userLocations, setUserLocations] = useState({});

  socket.emit('username', username);
  socket.emit('avatar', avatar);



  const onCursorMove = useCallback(
		function cursorMove(
			clientId: string,
			[x, y]: number[],
			clientProfile: IUserProfile
		) {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const absoluteX = width * x;
			const absoluteY = height * y;


			setUserLocations((userLocations) => {
				const newUserLocations = {
					...userLocations,
					[clientId]: {
						...userLocations[clientId],
						x: absoluteX,
						y: absoluteY,
            avatar: clientProfile.avatar,
            username: clientProfile.name,
					}
				};
				return newUserLocations;
			});
		},
		[]
	);

  useEffect(() => {
    const onRoomateDisconnect = (clientId: string) => {
      setUserLocations((userLocations) => {
        const newUserLocations = {
          ...userLocations
        };
        delete newUserLocations[clientId];
  
        return newUserLocations;
      });
    };

    socket.on('roommate disconnect', onRoomateDisconnect);
    socket.on('cursor move', onCursorMove);
    return () => {
      socket.off('roomate disconnect', onRoomateDisconnect);
      socket.off('cursor move', onCursorMove);
    };
  }, [onCursorMove]);

	useEffect(() => {
		async function fetchGraphQL(operationsDoc, operationName, variables) {
			let result = await fetch('https://hdapi.teztools.io/v1/graphql', {
				method: 'POST',
				body: JSON.stringify({
					query: operationsDoc,
					variables: variables,
					operationName: operationName,
				}),
			})
	
			var ress = await result.json();
			return ress;
		}

		async function fetchCollection(addr) {
			const { errors, data } = await fetchGraphQL(
			  query_collection,
			  'collectorGallery',
			  { address: addr }
			)
			if (errors) {
			  console.error(errors)
			}
			const result = data ? data.hic_et_nunc_token_holder : null;
			setCollections(result)
			return result
		  }

      if(activeAccount)
		  fetchCollection(activeAccount.address);
	}, [activeAccount]);

  const HashToURL = (hash, type) => {
		// when on preview the hash might be undefined.
		// its safe to return empty string as whatever called HashToURL is not going to be used
		// artifactUri or displayUri
		if (hash === undefined) {
		  return ''
		}
	  
		switch (type) {
		  case 'HIC':
			return hash.replace('ipfs://', 'https://pinata.hicetnunc.xyz/ipfs/')
		  case 'CLOUDFLARE':
			return hash.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
		  case 'PINATA':
			return hash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
		  case 'IPFS':
			return hash.replace('ipfs://', 'https://ipfs.io/ipfs/')
		  case 'INFURA':
			try {
			var cidv1 = new ipfsClient.CID(hash.replace('ipfs://', '')).toV1()
			var subdomain = cidv1.toBaseEncodedString('base32')
			return `https://${subdomain}.ipfs.infura-ipfs.io/`
		  } catch (err) {
			return undefined
		  }
		  case 'DWEB':
			return hash.replace('ipfs://', 'http://dweb.link/ipfs/')
		  default:
			console.error('please specify type')
			return hash
		}
	  }

  //fetch wallet name if it exist for example, trydrum.tez
  async function getDomain(address: string) {
    let domain;
    await fetch('https://api.tezos.domains/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            {
              reverseRecord(address: "`+ address +`"){owner domain{name}}
            }
            `,
        variables: {
        },
      }
      ),
      })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);	
        if(result.data.reverseRecord){
          domain = result.data.reverseRecord.domain.name;
          setSynced(domain);
          setUsername(domain);
        }
      });
  }

  const updateCursorPosition = useMemo(
		() =>
			_.throttle((position: [number, number]) => {
				socket.emit('cursor move', { x: position[0], y: position[1] });
			}, 200),
		[]
	);

	const onMouseMove = useCallback(
		(event: MouseEvent) => {
			const x = event.clientX;
			const y = event.clientY;

			const width = window.innerWidth;
			const height = window.innerHeight;

			const relativeX = (x - 60) / width;
			const relativeY = (y - 60) / height;

			updateCursorPosition([relativeX, relativeY]);

			if (userCursorRef.current) {
				userCursorRef.current.style.left = x + 20 + 'px';
				userCursorRef.current.style.top = y + 20 + 'px';
			}
		},
		[updateCursorPosition, userCursorRef]
	);

	useEffect(() => {
		window.addEventListener('mousemove', onMouseMove);
	}, [onMouseMove]);



  useEffect( () => {
    async function getAcc() {
      setActiveAccount( await dAppClient.getActiveAccount());
      if (activeAccount){
        setSynced(activeAccount.address.slice(0, 6) + "..." + activeAccount.address.slice(32, 36) );
        setUsername(activeAccount.address.slice(0, 6) + "..." + activeAccount.address.slice(32, 36) );
        setShowUnsync(true);
        getDomain(activeAccount.address);
      }
      else{
        setSynced('sync');
        setShowUnsync(false);
      }
    }
		getAcc();
	}, [activeAccount]);



  async function unsync() {
    setActiveAccount( await dAppClient.getActiveAccount())
		if (activeAccount) {
		  // User already has account connected, everything is ready
		  dAppClient.clearActiveAccount().then(async () => {
        setActiveAccount( await dAppClient.getActiveAccount()) 
        setSynced('sync');
        setUsername("anon");
        setShowUnsync(false);
		  });
		}
	}
	  
	async function sync() {
    setActiveAccount( await dAppClient.getActiveAccount())
    //Already connected
		if (activeAccount) {
      setSynced(activeAccount.address)
			setShowUnsync(true);
      getDomain(activeAccount.address);

		  return activeAccount;
		} 
    // The user is not synced yet
    else {
		  try {
        console.log("Requesting permissions...");
        const permissions = await dAppClient.requestPermissions();
        setActiveAccount( await dAppClient.getActiveAccount())
        console.log("Got permissions:", permissions.address);
        setSynced(permissions.address)
        setShowUnsync(true);

        getDomain(permissions.address);

		  } 
      catch (error) {
			  console.log("Got error:", error);
		  }
		}
	}



  return (
    <>
      <Cursor avatar={avatar} userCursorRef={userCursorRef} username={username}/>
    <div style={{ height: "100vh" }} >
      { userLocations && Object.entries(userLocations).map(([key, value]) => (
              <Cursors x={userLocations[key].x} y={userLocations[key].y} avatar={userLocations[key].avatar} username={userLocations[key].username}/>    
							)
            )
      }


      <div className="top-left" style={{fontSize: isMobile ? "1em" : "1.5em", display:"flex", alignItems:"center" }} > 	
        people party
        
      </div>

      <div>

      </div>

      <div className="bottom" style={{position:"absolute"}} >
        <div   >
        {showPanel &&
          <div className="panel"  style={{ display: "flex", width: "100%", overflowY: "auto" }}>
            {		collections && 			
            collections.map(({ token}) => (
              <IconButton
                key={token.id}
                onClick={() => {
                  //sendObjkt (token.id, 'objkt');
                  //console.log(token.id)
                  setAvatar(HashToURL( token.display_uri, 'IPFS'));
                  socket.emit('avatar', HashToURL( token.display_uri, 'IPFS'));
                }}
              >
                <Avatar variant="rounded" src={HashToURL( token.display_uri, 'IPFS')} alt={token.id} className={classes.sizeBig} />
                
              </IconButton>
            ))
            }
          </div>
        }
        </div>
        <div style={{display: "flex"}}>
          <div  style={{marginRight: "auto"}}>
            <Button  title={"Adventure Networks"} size={isMobile ? "small" : "medium"}  onClick={() => { }} >  <div style={{textAlign: "left"}}> Adventure <br></br>Networks </div> </Button>
          </div>

          <div style={{ display: "flex", alignItems: "end", justifyContent: "flex-end"}}>
          
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>


              {showUnsync && <Button size={isMobile ? "small" : "medium"}  title={"unsync"} onClick={() => { unsync() }} ><u>unsync</u> </Button>} 
              
              {showUnsync && <div> | </div>}
              <Button  title={"sync"} size={isMobile ? "small" : "medium"}  onClick={async () => { 	await sync();	}} ><u>{synced}</u> </Button> 
              {showUnsync && <><div> | </div>
              <Button size={isMobile ? "small" : "medium"}  title={"unsync"} onClick={() => { setShowPanel(!showPanel)}} >
                  <Avatar variant="rounded" src={avatar} alt="change avatar" className={classes.sizeSmall} /> 
                </Button> 
              </>} 
            </div>

          </div>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default App;
