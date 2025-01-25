import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface ConfigState {
    initStatus: 'uninit' | 'initing' | 'inited' | 'failed';
    darkMode: boolean;
    dbType: 'sqlite' | 'mysql' | 'postgresql';
    dbPath: string;
    mysqlHost: string;
    mysqlUser: string;
    mysqlPassword: string;
    mysqlDatabase: string;
    postgresHost: string;
    postgresUser: string;
    postgresPassword: string;
    postgresDatabase: string;

}

const initialState: ConfigState = {
    initStatus: 'uninit',
    darkMode: false,
    dbType: 'sqlite',
    dbPath: '',
    mysqlHost: '',
    mysqlUser: '',
    mysqlPassword: '',
    mysqlDatabase: '',
    postgresHost: '',
    postgresUser: '',
    postgresPassword: '',
    postgresDatabase: '',
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setInitStatus(state, action: PayloadAction<ConfigState['initStatus']>) {
            state.initStatus = action.payload;
        },
        setSqliteConfig(state, action: PayloadAction<{ dbPath: string }>) {
            state.dbType = 'sqlite';
            state.dbPath = action.payload.dbPath;
        },
        setMysqlDatabaseConfig(state, action: PayloadAction<{ host: string, user: string, password: string, database: string }>) {
            state.dbType = 'mysql';
            state.mysqlHost = action.payload.host;
            state.mysqlUser = action.payload.user;
            state.mysqlPassword = action.payload.password;
            state.mysqlDatabase = action.payload.database;
        },
        setPostgresDatabaseConfig(state, action: PayloadAction<{ host: string, user: string, password: string, database: string }>) {
            state.dbType = 'postgresql';
            state.postgresHost = action.payload.host;
            state.postgresUser = action.payload.user;
            state.postgresPassword = action.payload.password;
            state.postgresDatabase = action.payload.database;
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        },
    },
});

export const {
    setInitStatus,
    setDarkMode,
    setSqliteConfig,
    setMysqlDatabaseConfig,
    setPostgresDatabaseConfig,
} = configSlice.actions;

export default configSlice.reducer;