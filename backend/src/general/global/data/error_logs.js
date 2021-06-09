var errorLogs = [
    { 
        label: 'info', 
        codes: [
            {code: 0, msg: ''}
        ] 
    },
    { 
        label: 'critical', 
        codes: [
            {code: 500, msg: 'Server error'},
            {code: 9000, msg: 'Database connection error'}
        ]
    }
];

module.exports = errorLogs;