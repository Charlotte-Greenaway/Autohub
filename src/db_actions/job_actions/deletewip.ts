const deletewip = (db:any, wip:any) => {
    return new Promise((resolve, reject) => {
        // Check if the VIN already exists in the database
        db.run("DELETE FROM jobs WHERE wip = ?", wip, (err:any) => {
            if (err) {
                reject("error");
                return;
            }else{
                resolve("success")
                return;
            }
        });
    });
};

export default deletewip;