declare module 'firebase/app' {
  export function initializeApp(config: Record<string, string>): any;
}

declare module 'firebase/firestore' {
  export function getFirestore(app: any): any;
  export function collection(db: any, path: string): any;
  export function addDoc(collectionRef: any, data: Record<string, any>): Promise<any>;
  export function query(collectionRef: any, ...constraints: any[]): any;
  export function where(field: string, op: string, value: any): any;
  export function orderBy(field: string, direction?: string): any;
  export function onSnapshot(query: any, callback: (snapshot: any) => void): () => void;
  export function serverTimestamp(): any;
}
