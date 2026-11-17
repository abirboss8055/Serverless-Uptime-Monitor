const fs = require('fs');

// তুমি যে সাইটগুলো মনিটর করতে চাও, তার লিস্ট (পরে তুমি চাইলে আরও এড করতে পারবে)
const WEBSITES = [
    { name: "My Serverless Pipeline", url: "https://abirboss8055.github.io/serverless-data-pipeline/" },
    { name: "GitHub Status", url: "https://www.githubstatus.com/" },
    { name: "Dummy API", url: "https://jsonplaceholder.typicode.com/todos/1" }
];

async function checkUptime() {
    console.log("Starting Uptime Check...");
    let logData = [];
    
    // আগের কোনো লগ ডেটা থাকলে সেটা রিড করা হচ্ছে
    if (fs.existsSync('uptime-log.json')) {
        const rawData = fs.readFileSync('uptime-log.json');
        logData = JSON.parse(rawData);
    }

    const currentRun = {
        timestamp: new Date().toISOString(),
        results: []
    };

    // প্রত্যেকটা সাইটে রিকোয়েস্ট পাঠিয়ে চেক করা হচ্ছে
    for (const site of WEBSITES) {
        const start = Date.now();
        try {
            const response = await fetch(site.url);
            const duration = Date.now() - start; // রেসপন্স আসতে কতক্ষণ লাগলো
            
            currentRun.results.push({
                name: site.name,
                url: site.url,
                status: response.ok ? "UP" : "DOWN",
                statusCode: response.status,
                responseTime: duration
            });
            console.log(`[${response.ok ? "UP" : "DOWN"}] ${site.name} - ${duration}ms`);
        } catch (error) {
            const duration = Date.now() - start;
            currentRun.results.push({
                name: site.name,
                url: site.url,
                status: "DOWN",
                statusCode: "ERROR",
                responseTime: duration
            });
            console.log(`[DOWN] ${site.name} - Error`);
        }
    }

    // নতুন লগটা সবার উপরে যোগ করা হচ্ছে
    logData.unshift(currentRun);
    
    // ফাইল যেন বেশি বড় না হয়ে যায়, তাই শুধুমাত্র শেষের ৫০ বার চেকিংয়ের রেকর্ড রাখা হবে
    if (logData.length > 50) {
        logData.pop();
    }

    // JSON ফাইলে ডেটা সেভ করা হচ্ছে
    fs.writeFileSync('uptime-log.json', JSON.stringify(logData, null, 2));
    console.log("Uptime check complete. Data saved to uptime-log.json");
}

checkUptime();