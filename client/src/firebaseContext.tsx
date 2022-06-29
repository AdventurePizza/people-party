// @ts-nocheck
import React, { useCallback } from 'react';


export interface IFirebaseContext {
	getProfile: (address: string) => Promise<IFetchResponseBase>;
	setProfile: (address: string, username: string, avatar: string) => Promise<IFetchResponseBase>;
	getBgFirebase: () => Promise<IFetchResponseBase>;
	setBgFirebase: (background: string) => Promise<IFetchResponseBase>;
	getFrames: () => Promise<IFetchResponseBase>;
	setFrame: (image: string, title: string, id: number) => Promise<IFetchResponseBase>;
	getTemplate: () => Promise<IFetchResponseBase>;
	setTemplate: (template: string) => Promise<IFetchResponseBase>;

	//drum
	firebaseUpdateDrumCount: (amt: number, address: string) => void;
	getDrumCount: (address: string) => Promise<IFetchResponseBase>;
	claim: (address: string) => Promise<IFetchResponseBase>;
	syncRewards: (tempAddress: string, address: string) => void;
	getDrumBalance: (address: string) => Promise<IFetchResponseBase>;
	setMessage: (address: string) => Promise<IFetchResponseBase>;
	getBlockchainMessage: () => Promise<IFetchResponseBase>;

	setExhibitWallet: (address: string) => Promise<IFetchResponseBase>;
	getExhibitWallet: () => Promise<IFetchResponseBase>;

}

export const FirebaseContext = React.createContext<IFirebaseContext>({
	getProfile: () => Promise.resolve({ isSuccessful: false }),
	setProfile: () => Promise.resolve({ isSuccessful: false }),
	getBgFirebase: () => Promise.resolve({ isSuccessful: false }),
	setBgFirebase: () => Promise.resolve({ isSuccessful: false }),
	getFrames: () => Promise.resolve({ isSuccessful: false }),
	setFrame: () => Promise.resolve({ isSuccessful: false }),
	getTemplate: () => Promise.resolve({ isSuccessful: false }),
	setTemplate: () => Promise.resolve({ isSuccessful: false }),

	//drum
	firebaseUpdateDrumCount: () => Promise.resolve({ isSuccessful: false }),
	getDrumCount: () => Promise.resolve({ isSuccessful: false }),
	claim: () => Promise.resolve({ isSuccessful: false }),
	syncRewards: () => Promise.resolve({ isSuccessful: false }),
	getDrumBalance: () => Promise.resolve({ isSuccessful: false }),
	getBlockchainMessage: () => Promise.resolve({ isSuccessful: false }),

	setExhibitWallet: () => Promise.resolve({ isSuccessful: false }),
	getExhibitWallet: () => Promise.resolve({ isSuccessful: false }),
});

const fetchBase =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://peopleparty-server.herokuapp.com';


export const FirebaseProvider: React.FC = ({ children }) => {

	const firebaseUpdateDrumCount = useCallback(
		async (amt: number, address: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/drum/${address}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ amt: amt })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const claim = useCallback(
		async (address: string): Promise<IFetchResponseBase> => {

			const fetchRes = await fetch(fetchBase + `/users/drum/claim/${address}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getDrumCount = useCallback(
		async (address: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/drum/${address}`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const syncRewards = useCallback(
		async (tempAddress: string, address: string): Promise<IFetchResponseBase> => {

			const fetchRes = await fetch(fetchBase + `/users/drum/sync/${address}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tempAddress: tempAddress })
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getDrumBalance = useCallback(
		async (address: string): Promise<IFetchResponseBase> => {

			const fetchRes = await fetch(fetchBase + `/users/drum/getBalance/${address}`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getBlockchainMessage = useCallback(
		async (): Promise<IFetchResponseBase> => {

			const fetchRes = await fetch(fetchBase + `/users/getBlockchainMessage`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getProfile = useCallback(
		async (address: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/profile/${address}`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const setProfile = useCallback(
		async (address: string, username: string, avatar: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/profile/${address}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: username, avatar: avatar })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getBgFirebase = useCallback(
		async (): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/background`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const setBgFirebase = useCallback(
		async (background: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/background`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ background: background })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);
	const getFrames = useCallback(
		async (): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/frame`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const setFrame = useCallback(
		async (image: string, title: string, id: number): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/frame`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ image: image, title: title, id: id })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	const getTemplate = useCallback(
		async (): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/template`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const setTemplate = useCallback(
		async (template: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/template`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ template: template })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);


	const getExhibitWallet = useCallback(
		async (): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/exhibit`, {
				method: 'GET'
			});

			if (fetchRes.ok) {
				return await fetchRes.json();
			}
		},
		[]
	);

	const setExhibitWallet = useCallback(
		async (address: string): Promise<IFetchResponseBase> => {
			const fetchRes = await fetch(fetchBase + `/users/exhibit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ address: address })
			});

			if (fetchRes.ok) {
				return { isSuccessful: true };
			}

			return { isSuccessful: false, message: fetchRes.statusText };
		},
		[]
	);

	return (
		<FirebaseContext.Provider
			value={{
				getProfile,
				setProfile,
				getBgFirebase,
				setBgFirebase,
				getFrames,
				setFrame,
				getTemplate,
				setTemplate,
				//drum
				firebaseUpdateDrumCount,
				claim,
				getDrumCount,
				syncRewards,
				getDrumBalance,
				getBlockchainMessage,

				getExhibitWallet,
				setExhibitWallet
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
