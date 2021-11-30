const json2csv = require('json2csv').parse;

//For unique file name
const dateTime = new Date().toISOString().slice(-24).replace(/\D/g, 
'').slice(0, 14); 

const filePath = path.join(__dirname, "../../../", "public", "exports", "csv-" + dateTime + ".csv");

let csv; 

const student = await req.db.collection('Student').find({}).toArray();

// Logging student
// [{id:1,name:"John",country:"USA"},{id:1,name:"Ronny",country:"Germany"}]

const fields = ['id','name','country'];

 try {
        csv = json2csv(booking_info, {fields});
    } catch (err) {
        return res.status(500).json({err});
    }

 fs.writeFile(filePath, csv, function (err) {
        if (err) {
            return res.json(err).status(500);
        }
        else {
            setTimeout(function () {
                fs.unlink(filePath, function (err) { // delete this file after 30 seconds
                if (err) {
                    console.error(err);
                }
                console.log('File has been Deleted');
            });

        }, 30000);
            res.download(filePath);
        }
    })