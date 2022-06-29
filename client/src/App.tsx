// @ts-nocheck

import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
  useRef
} from "react";

//ui
import { Button, makeStyles, Avatar, IconButton, createStyles, Theme, Switch, Paper, TextField } from "@material-ui/core";
import homeIcon from "./assets/home.png";
import framesIcon from "./assets/frames.png";
import markerıcon from "./assets/marker.png";
import _ from "underscore";
import drum from "./assets/drum.svg";
import drumIcon from "./assets/drumIcon.png";
import scroll from "./assets/scroll.png";
import drumBeat from "./assets/drumbeat.mp3";
import musicNote from "./assets/musical-note.svg";
import galleryIcon from "./assets/gallery.png";
import discord from "./assets/discord-192.png";

//logic
import io from "socket.io-client";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import { Cursor, Cursors } from './Cursor';
import { FirebaseContext } from "./firebaseContext";
import { ILineData, Whiteboard, drawLine } from './Whiteboard';
import WhiteboardPanel from './WhiteboardPanel';
import { DAppClient } from "@airgap/beacon-sdk";
const socketURL =
  window.location.hostname === "localhost"
    ? "ws://localhost:8000"
    : "wss://peopleparty-server.herokuapp.com";

const socket = io(socketURL, { transports: ["websocket"] });
const dAppClient = new DAppClient({ name: "Beacon Docs" });
const tempId = uuidv4();

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
    sizeVerySmall: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

interface INote {
  key: string;
}

function App() {

  const classes = useStyles();
  const { getProfile, setProfile, getBgFirebase, setBgFirebase, getFrames, setFrame, getTemplate, setTemplate, firebaseUpdateDrumCount, claim, getDrumCount, getDrumBalance, getExhibitWallet, setExhibitWallet } = useContext(FirebaseContext);
  const [activeAccount, setActiveAccount] = useState();
  const [synced, setSynced] = useState('sync');
  const [showUnsync, setShowUnsync] = useState(false);
  const isMobile = window.innerWidth <= 500;
  const [showPanel, setShowPanel] = useState(true);
  const [chosenPanel, setChosenPanel] = useState("templates");
  const [collections, setCollections] = useState([]);
  const [username, setUsername] = useState("anon");
  const [avatar, setAvatar] = useState("https://ipfs.io/ipfs/QmVAiRHjVLPJYnf7jCpVeqrqRBE7HFN9nm5ZB2QSZ5BY52");
  const userCursorRef = React.createRef<HTMLDivElement>();
  const [userLocations, setUserLocations] = useState({});
  const [background, setBackground] = useState("");
  const [bgSwitch, setBgSwitch] = React.useState(false);
  const [curTemplate, setCurTemplate] = useState("home");
  const [selectedFrame, setSelectedFrame] = useState(0); // 0 for none 1, 2, 3 .. for rest
  const [frameObjkt1, setFrameObjkt1] = useState({ image: "", title: "" })
  const [frameObjkt2, setFrameObjkt2] = useState({ image: "", title: "" })
  const [frameObjkt3, setFrameObjkt3] = useState({ image: "", title: "" })
  const [markerColor, setMarkerColor] = useState("black");

  //drum
  const drumRef = React.createRef<HTMLImageElement>();
  const audioRef = React.createRef<HTMLAudioElement>();
  const _audioRef = useRef<HTMLAudioElement>();
  const musicRef = React.createRef<HTMLAudioElement>();
  const _musicRef = useRef<HTMLAudioElement>();
  const toUpdateCountRef = useRef<number>(0);
  const [notes, setNotes] = useState<INote[]>([]);
  const [hasClickedDrum, setHasClickedDrum] = useState(false);
  const [drumCount, setDrumCount] = useState(-1);
  const { enqueueSnackbar } = useSnackbar();
  const [noteCoords, setNoteCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [drumReward, setDrumReward] = useState(0);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [drumPrice, setDrumPrice] = useState(0);
  const [drumBalance, setDrumBalance] = useState(0);
  const [xtzPrice, setXtzPrice] = useState(0);
  const [XTZBalance, setXTZBalance] = useState(0);
  const [dashboardWallet, setDashboardWallet] = useState("");
  const [dashboardCollection, setDashboardCollection] = useState([]);
  const [inputValue, setInputValue] = useState();


  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgSwitch(event.target.checked);
  };

  socket.emit('username', username);
  socket.emit('avatar', avatar);

  useEffect(() => {
    getBgFirebase().then((res) => {
      if (res) {
        setBackground(res.background);
      }
    });

    getFrames().then((res) => {
      if (res) {
        setFrameObjkt1({ image: res[0].image, title: res[0].title })
        setFrameObjkt2({ image: res[1].image, title: res[1].title })
        setFrameObjkt3({ image: res[2].image, title: res[2].title })
      }
    });

    getTemplate().then((res) => {
      if (res) {
        setCurTemplate(res.template);
      }
    });

    getExhibitWallet().then((res) => {
      if (res) {
        setDashboardWallet(res.address);
      }
    });
  }, [getBgFirebase, getFrames, getTemplate, getExhibitWallet]);


  useEffect(() => {
    getProfile(activeAccount ? activeAccount.address : "").then((res) => {
      if (res) {
        socket.emit('username', res.username);
        socket.emit('avatar', res.avatar);
        setUsername(res.username);
        setAvatar(res.avatar);
      }
    });
  }, [getProfile, activeAccount]);

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

  const onBgChange = useCallback(
    function bgChange(
      background: string,
    ) {
      setBackground(background)
    },
    []
  );

  const onFrameChange = useCallback((data) => {

    if (data.id === 1)
      setFrameObjkt1({ image: data.image, title: data.title })
    else if (data.id === 2)
      setFrameObjkt2({ image: data.image, title: data.title })
    else
      setFrameObjkt3({ image: data.image, title: data.title })
  },
    []
  );

  const onTemplateChange = useCallback((data) => {
    setCurTemplate(data)
  },
    []
  );

  const drawLineEvent = useCallback((strLineData) => {
    let lineData: ILineData = JSON.parse(strLineData);
    const { prevX, prevY, currentX, currentY, color } = lineData;
    drawLine(true, canvasRef, prevX, prevY, currentX, currentY, color, false);
  }, []);

  const onExhibitChange = useCallback(
    function onExhibitChange(
      address: string,
    ) {
      setDashboardWallet(address)
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
    socket.on('background', onBgChange);
    socket.on('frame', onFrameChange);
    socket.on('template', onTemplateChange);
    socket.on('whiteboard', drawLineEvent);
    socket.on('exhibit', onExhibitChange);

    return () => {
      socket.off('roomate disconnect', onRoomateDisconnect);
      socket.off('cursor move', onCursorMove);
      socket.off('background', onBgChange);
      socket.on('frame', onFrameChange);
      socket.on('template', onTemplateChange);
      socket.on('whiteboard', drawLineEvent);
      socket.off('exhibit', onExhibitChange);
    };
  }, [onCursorMove, onBgChange, onFrameChange, onTemplateChange, drawLineEvent, onExhibitChange]);

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

    async function fetchDashboardCollection(addr) {
      const { errors, data } = await fetchGraphQL(
        query_collection,
        'collectorGallery',
        { address: addr }
      )
      if (errors) {
        console.error(errors)
      }
      const result = data ? data.hic_et_nunc_token_holder : null;
      console.log(result)
      setDashboardCollection(result)
      return result
    }

    if (activeAccount)
      fetchCollection(activeAccount.address);

    fetchDashboardCollection(dashboardWallet);
  }, [activeAccount, dashboardWallet]);




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


  const onUnload = e => {
    e.preventDefault();
    if (toUpdateCountRef.current) {
      firebaseUpdateDrumCount(toUpdateCountRef.current, activeAccount ? activeAccount.address : tempId);
      toUpdateCountRef.current = 0;
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);

  }
  )

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
              reverseRecord(address: "`+ address + `"){owner domain{name}}
            }
            `,
        variables: {
        },
      }
      ),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.reverseRecord) {
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
      }, 5),
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



  useEffect(() => {
    async function getAcc() {
      setActiveAccount(await dAppClient.getActiveAccount());
      if (activeAccount) {
        setSynced(activeAccount.address.slice(0, 6) + "..." + activeAccount.address.slice(32, 36));
        setUsername(activeAccount.address.slice(0, 6) + "..." + activeAccount.address.slice(32, 36));
        setShowUnsync(true);
        getDomain(activeAccount.address);

        fetch('https://api.tzkt.io/v1/accounts/' + activeAccount.address)
          .then(response => response.json())
          .then(data => setXTZBalance(parseFloat(data.balance / 1000000).toFixed(2)))
      }
      else {
        setSynced('sync');
        setShowUnsync(false);
      }
    }
    getAcc();

    async function getDRUMs() {
      setDrumBalance((await getDrumBalance(activeAccount ? activeAccount.address : "")).balance);
    }
    getDRUMs();



    fetch('https://min-api.cryptocompare.com/data/price?fsym=XTZ&tsyms=USD')
      .then(response => response.json())
      .then(data => setXtzPrice(data.USD))
    //setMessage((await getBlockchainMessage()).value);

    fetch('https://api.teztools.io/v1/prices')
      .then(response => response.json())
      .then((data) => { setDrumPrice(data.contracts[312].currentPrice) })

  }, [activeAccount, getDrumBalance, drumBalance]);


  useEffect(() => {
    if (audioRef.current) {
      _audioRef.current = audioRef.current;
    }
    if (musicRef.current) {
      _musicRef.current = musicRef.current;
    }
  });

  const setCoords = useCallback(() => {
    if (drumRef.current) {
      const rect = drumRef.current.getBoundingClientRect();
      setNoteCoords({
        top: rect.top - rect.height / 2 - 50,
        left: rect.left + rect.width / 2 - 25, // noteWidth = 50
      });
    }
  }, [drumRef]);


  useEffect(() => {
    getDrumCount(activeAccount ? activeAccount.address : tempId).then((res) => {
      if (res) {
        setDrumCount(res.count);
        setDrumReward(res.claim);
      }
    });
  }, [getDrumCount, activeAccount]);


  useEffect(() => {
    const onDrumbeat = () => {
      if (_audioRef.current) {
        _audioRef.current.currentTime = 0;
        _audioRef.current.play();
        setDrumCount((count) => count + 1);
      }

      setNotes((notes) => notes.concat({ key: uuidv4() }));
      enqueueSnackbar("someone beat the drum!", {
        variant: "default",
      });
    };

    socket.on("drumbeat", onDrumbeat);

    window.addEventListener("resize", setCoords);

    return () => {
      socket.off("drumbeat", onDrumbeat);
      window.removeEventListener("resize", setCoords);
    };
  }, [enqueueSnackbar, setCoords]);

  useEffect(() => {
    if (drumRef.current && (noteCoords.top === 0 || noteCoords.left === 0)) {
      setCoords();
    }
  }, [drumRef, noteCoords, setCoords]);

  const onClickDrum = () => {
    setNotes((notes) => notes.concat({ key: uuidv4() }));
    setHasClickedDrum(true);

    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    socket.emit("drumbeat");

    if (toUpdateCountRef.current !== null) {
      toUpdateCountRef.current++;
      updateDrumCount();
      //updateDrumCount(toUpdateCountRef.current, activeAccount ? activeAccount.address : tempId);
    } else {
      toUpdateCountRef.current = 0;
    }



    setDrumCount((count) => count + 1);
    setDrumReward((drumReward) => drumReward + 1);
  };

  // eslint-disable-next-line
  const updateDrumCount = useCallback(
    _.throttle(() => {
      if (toUpdateCountRef.current) {
        firebaseUpdateDrumCount(toUpdateCountRef.current, activeAccount ? activeAccount.address : tempId);
        toUpdateCountRef.current = 0;
      }
    }, 3000),
    [activeAccount]
  );


  async function unsync() {
    setActiveAccount(await dAppClient.getActiveAccount())
    if (activeAccount) {
      // User already has account connected, everything is ready
      dAppClient.clearActiveAccount().then(async () => {
        setActiveAccount(await dAppClient.getActiveAccount())
        setSynced('sync');
        setUsername("anon");
        setShowUnsync(false);
      });
    }
  }

  async function sync() {
    setActiveAccount(await dAppClient.getActiveAccount())
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
        setActiveAccount(await dAppClient.getActiveAccount())
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

  const actionHandler = (key: string, ...args: any[]) => {
    switch (key) {
      case 'whiteboard':
        const strlineData = args[0] as string;
        socket.emit('whiteboard', strlineData);
        break;
      default:
    }
  };

  async function claimRewards() {

    enqueueSnackbar("Sending " + drumReward + " DRUM !", {
      variant: "default",
    });

    let newTransaction = { message: "Sending Claim DRUM Request", link: "", color: "black" }
    setTransactions((transaction) => transaction.concat(newTransaction));

    const result = await claim(activeAccount ? activeAccount.address : tempId);
    if (result.success) {
      enqueueSnackbar(<div onClick={() => { window.open(result.message); }} > hash:  {result.message}  </div>, {
        variant: "success",
      });
      setTransactions((transaction) => transaction.concat({ message: "Recieved " + result.amount + " DRUM !", link: result.message, color: "green" }));
    } else {
      enqueueSnackbar(result.message, {
        variant: "error",
      });
      setTransactions((transaction) => transaction.concat({ message: "Failed Transaction", link: "", color: "red" }));
    }
    setDrumReward(0);
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onKeyPressChat = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      //setDashboardCollection([])
      setDashboardWallet(inputValue);
      socket.emit('exhibit', inputValue);
      setExhibitWallet(inputValue)
    }
  };


  return (
    <>
      <Cursor avatar={avatar} userCursorRef={userCursorRef} username={username} />
      <div style={{
        height: window.innerHeight,
        backgroundImage: curTemplate === "home" ? `url(${background})` : "",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
        onClick={() => { setShowPanel(false); setSelectedFrame(0); }}
      >
        {curTemplate === "drum" &&
          <>
            <audio src={drumBeat} ref={audioRef} autoPlay muted />
          </>
        }
        {userLocations && Object.entries(userLocations).map(([key]) => (
          <Cursors x={userLocations[key].x} y={userLocations[key].y} avatar={userLocations[key].avatar} username={userLocations[key].username} />
        )
        )
        }
        <Whiteboard
          onWhiteboardPanel={curTemplate === "draw"}
          canvasRef={canvasRef}
          brushColor={markerColor}
          onAction={actionHandler}
        />
        <div className="top-left" style={{ fontSize: isMobile ? "1.5em" : "3em", display: "flex", alignItems: "center", paddingLeft: 10 }} >
          people party
        </div>
        {curTemplate === "polaroid" && <div class="wrapper">
          <div class="item" style={{ border: selectedFrame === 1 ? "dashed" : "none" }} onClick={(e) => { setSelectedFrame(1); e.stopPropagation(); }}>
            <div class="polaroid"><img src={frameObjkt1.image} alt="polaroid1" />
              <div class="caption">{frameObjkt1.title}</div>
            </div>
          </div>

          <div class="item" style={{ border: selectedFrame === 2 ? "dashed" : "none" }} onClick={(e) => { setSelectedFrame(2); e.stopPropagation(); }}>
            <div class="polaroid"><img src={frameObjkt2.image} alt="polaroid2" />
              <div class="caption">{frameObjkt2.title}</div>
            </div>
          </div>

          <div class="item" style={{ border: selectedFrame === 3 ? "dashed" : "none" }} onClick={(e) => { setSelectedFrame(3); e.stopPropagation(); }}>
            <div class="polaroid"><img src={frameObjkt3.image} alt="polaroid3" />
              <div class="caption">{frameObjkt3.title} </div>
            </div>
          </div>
        </div>}

        {curTemplate === "drum" &&
          <div className="app-container" style={{ height: window.innerHeight }} >
            <img
              ref={drumRef}
              onClick={onClickDrum}
              alt="drum"
              src={drum}
              className="drum"
            />
            {!hasClickedDrum && <div>Click the drum!</div>}

            <TransitionGroup>
              {notes.map((note) => (
                <CSSTransition
                  key={note.key}
                  timeout={1000}
                  classNames="note-transition"
                  onEntered={() => {
                    const noteIndex = notes.findIndex(
                      (_note) => _note.key === note.key
                    );
                    setNotes([
                      ...notes.slice(0, noteIndex),
                      ...notes.slice(noteIndex + 1),
                    ]);
                  }}
                >
                  <img
                    alt="music note"
                    src={musicNote}
                    className="music-note"
                    style={{
                      top: noteCoords.top,
                      left: noteCoords.left,
                    }}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>


          </div>
        }

        {curTemplate === "gallery" &&
          <div className="exhibitContainer">
            {
              dashboardCollection &&
              dashboardCollection.map((item, i) => (
                i < 8 &&
                <div className="red frame" onClick={() => { window.open("https://objkt.com/asset/hicetnunc/" + item.token.id) }}>
                  <img src={HashToURL(item.token.display_uri, 'IPFS')} alt="" />

                  <figcaption>
                    <h2>{item.token.title}</h2>
                  </figcaption>
                </div>

              ))
            }
          </div>
        }


        <div className="top-right" style={{ position: "absolute" }} >
          <Paper elevation={3} >
            <Button onClick={(e) => {
              if (chosenPanel === "templates" || !showPanel) {
                setShowPanel(!showPanel);
              }
              setChosenPanel("templates")
              e.stopPropagation()
            }}>
              Template: {curTemplate}
            </Button>
          </Paper >

          {curTemplate === "drum" && drumCount >= 0 && <div className="top-right" style={{ fontSize: isMobile ? "1em" : "1.5em", textAlign: "end" }}>
            <div style={{ textAlign: "end", paddingRight: "10px", paddingTop: "10px" }}> {drumCount} </div>
          </div>}

          {/*curTemplate === "dashboard" &&
            <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
              <div style={{ fontSize: isMobile ? "0.8em" : "0.8em", textAlign: "end" }}>
                DRUM = {drumPrice.toFixed(6)} $
                <br></br>
                XTZ = {xtzPrice} $

              </div>
            </div>*/
          }
        </div>
        {curTemplate === "draw" && <WhiteboardPanel setMarkerColor={setMarkerColor} />}

        <div className="bottom" style={{ position: "absolute", backgroundColor: "white" }} onClick={(e) => { e.stopPropagation() }} >
          <div>
            {showPanel && chosenPanel === "wallet" &&
              <div className="panel" style={{ display: "flex", width: "100%", overflowY: "auto" }}>
                {collections &&
                  collections.map(({ token }) => (
                    <IconButton
                      key={token.id}
                      onClick={() => {
                        if (bgSwitch) {
                          setBackground(HashToURL(token.display_uri, 'IPFS'));
                          socket.emit('background', HashToURL(token.display_uri, 'IPFS'));
                          setBgFirebase(HashToURL(token.display_uri, 'IPFS'))
                        }
                        else if (selectedFrame !== 0) {
                          if (selectedFrame === 1)
                            setFrameObjkt1({ image: HashToURL(token.display_uri, 'IPFS'), title: token.title })
                          else if (selectedFrame === 2)
                            setFrameObjkt2({ image: HashToURL(token.display_uri, 'IPFS'), title: token.title })
                          else
                            setFrameObjkt3({ image: HashToURL(token.display_uri, 'IPFS'), title: token.title })

                          socket.emit('frame', { image: HashToURL(token.display_uri, 'IPFS'), title: token.title, id: selectedFrame });
                          setFrame(HashToURL(token.display_uri, 'IPFS'), token.title, selectedFrame)
                        }
                        else {
                          setAvatar(HashToURL(token.display_uri, 'IPFS'));
                          socket.emit('avatar', HashToURL(token.display_uri, 'IPFS'));
                          setProfile(activeAccount.address, username, HashToURL(token.display_uri, 'IPFS'));
                        }

                      }}
                    >
                      <Avatar variant="rounded" src={HashToURL(token.display_uri, 'IPFS')} alt={token.id} className={classes.sizeBig} />

                    </IconButton>
                  ))
                }
              </div>

            }

            {
              curTemplate === "gallery" &&

              <div >
                <div style={{ display: "flex", padding: 10 }}>
                  <TextField
                    id="standard-basic"
                    label="Enter a wallet address"
                    variant="standard"
                    fullWidth
                    value={inputValue}
                    onChange={onChangeInput}
                    onKeyPress={onKeyPressChat}
                  />
                  <Button title={"Display"} size={isMobile ? "small" : "medium"} onClick={() => { }} >  Display  </Button>
                </div>
                {/*
                <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
                  {XTZBalance} XTZ ({parseFloat(XTZBalance * xtzPrice).toFixed(2)} $)
                  <br></br>
                  {drumBalance} DRUM ({parseFloat(drumBalance * drumPrice * xtzPrice).toFixed(2)} $)
                </div>*/}

              </div>


            }
            {showPanel && chosenPanel === "templates" &&
              <div className="panel" style={{ display: "flex", width: "100%", overflowY: "auto" }}>

                <IconButton
                  onClick={() => { setCurTemplate("home"); socket.emit('template', "home"); setTemplate("home") }}
                >
                  <Avatar variant="rounded" src={homeIcon} alt={"Wallpaper"} className={classes.sizeSmall} />
                </IconButton>

                <IconButton
                  onClick={() => { setCurTemplate("polaroid"); socket.emit('template', "polaroid"); setTemplate("polaroid") }}
                >
                  <Avatar variant="rounded" src={framesIcon} alt={"Exhibition"} className={classes.sizeSmall} />
                </IconButton>

                <IconButton
                  onClick={() => { setCurTemplate("draw"); socket.emit('template', "draw"); setTemplate("draw") }}
                >
                  <Avatar variant="rounded" src={markerıcon} alt={"Whiteboard"} className={classes.sizeSmall} />
                </IconButton>

                <IconButton
                  onClick={() => { setCurTemplate("drum"); socket.emit('template', "drum"); setTemplate("drum") }}
                >
                  <Avatar variant="rounded" src={drumIcon} alt={"drum"} className={classes.sizeSmall} />
                </IconButton>

                <IconButton
                  onClick={() => { setCurTemplate("gallery"); socket.emit('template', "gallery"); setTemplate("gallery") }}
                >
                  <Avatar variant="rounded" src={galleryIcon} alt={"gallery"} className={classes.sizeSmall} />
                </IconButton>
              </div>
            }



            {!showPanel && curTemplate === "drum" &&
              <div >

                {showTransactions && <div style={{ border: "solid 1px", marginRight: 10, height: isMobile ? 180 : 400, overflowY: "auto", fontSize: isMobile ? "0.9em" : "1.3em", backgroundColor: "white" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 64, height: 10 }}></div>

                    Transactions List

                    <Button title={"transactions"} size={isMobile ? "small" : "medium"} onClick={async () => { setShowTransactions(false) }} > X </Button>

                  </div>
                  {transactions &&
                    transactions.slice(0).reverse().map((transaction, index) => (
                      <div key={index.toString()}>
                        {
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (transaction.link) {
                                window.open(transaction.link);
                              }
                            }}
                            style={{ width: "100%", color: transaction.color }}
                          >
                            {transaction.message}
                          </Button>
                        }
                      </div>
                    ))}
                </div>
                }
                <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
                  <Button title={"transactions"} size={isMobile ? "small" : "medium"} onClick={async () => { setShowTransactions(!showTransactions) }} > <img style={{ width: 20 }} alt="transactions" src={scroll} /> </Button>

                  {showUnsync ?
                    <Button title={"claim"} size={isMobile ? "small" : "medium"} variant="outlined" style={{}} onClick={async () => { await claimRewards(); }} >  Claim {drumReward} DRUM  </Button>
                    : <div style={{ fontSize: isMobile ? "0.8em" : "0.8em", marginRight: 12 }}> sync to claim {drumReward} DRUM </div>
                  }
                </div>
                <div style={{ fontSize: isMobile ? "0.8em" : "1em", textAlign: "end", paddingRight: "10px" }}> Balance: {drumBalance} DRUM </div>
              </div>

            }


          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "auto" }}>
              <Button title={"Adventure Networks"} size={isMobile ? "small" : "medium"} onClick={() => { }} >  <div style={{ textAlign: "left" }}> Adventure <br></br>Networks </div> </Button>
              <IconButton
                onClick={() => { window.open("https://discord.gg/eHemqMfFAV") }}
              >
                <img src={discord} width="20" height="20"></img>
              </IconButton>
            </div>

            <div style={{ display: "flex", alignItems: "end", justifyContent: "flex-end" }}>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>


                {showUnsync && <Button size={isMobile ? "small" : "medium"} title={"unsync"} onClick={() => { unsync() }} ><u>unsync</u> </Button>}

                {showUnsync && <div> | </div>}
                <Button title={"sync"} size={isMobile ? "small" : "medium"} onClick={async () => { await sync(); }} ><u>{synced}</u> </Button>
                {showUnsync && <><div> | </div>
                  <Button size={isMobile ? "small" : "medium"} title={"unsync"} onClick={(e) => {
                    if (chosenPanel === "wallet" || !showPanel) {
                      setShowPanel(!showPanel);
                    }
                    setChosenPanel("wallet")
                    e.stopPropagation()
                  }} >
                    <Avatar variant="rounded" src={avatar} alt="change avatar" className={classes.sizeSmall} />
                  </Button>
                  |
                  <Switch checked={bgSwitch} onChange={handleChange} />
                  <b> Background </b>   &nbsp;
                </>
                }
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;

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
export const getRelativePos = (
  clientX: number,
  clientY: number,
  width: number,
  height: number
) => {
  const x = clientX;
  const y = clientY;

  const relativeX = (x - width) / window.innerWidth;
  const relativeY = (y - height) / window.innerHeight;

  return { x: relativeX, y: relativeY };
};
