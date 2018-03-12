module.exports = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.DATABASE_URL || 'postgres://msdtmfrytrjfbi:8fd33c5dcbc123e8ea2585aa011324ab6b220b4d87c03b66ec705935a0145de3@ec2-184-73-202-179.compute-1.amazonaws.com:5432/dbqobe1au7jt5v',
    secret: process.env.SECRET || 'secret',
    cn: {
        host: 'the-y-list.crkbfas1hev6.us-east-1.rds.amazonaws.com',
        port: 5432,
        database: 'theylist_v1',
        user: 'abhiramee08b021',
        password: 'EE08b02!',
        ssl: true,
    },
    firebase_config: {
        apiKey: 'AIzaSyDfEYzrDSPGVGau1l5QP0ww6Z0P9Jv0-bE',
        authDomain: 'the-y-list.firebaseapp.com',
        databaseURL: 'https://the-y-list.firebaseio.com',
        storageBucket: 'the-y-list.appspot.com',
    },
    aws_config: { 
        "accessKeyId": "AKIAJCD63DDHSU5REPNQ",
        "secretAccessKey": "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",
        "region": "us-east-1" 
    }
};
