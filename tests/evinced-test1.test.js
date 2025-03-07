const { fixture } = require("testcafe");
const { ClientFunction } = require("testcafe");
const { setCredentials, EvincedSDK } = require("@evinced/js-testcafe-sdk");


let evinced;
fixture`Evinced Demo site tests`.page`https://demo.evinced.com/`
    .before(async (ctx) => {
        // Set online credentials
        setCredentials({
            serviceId: process.env.EVINCED_SERVICE_ID,
            secret: process.env.EVINCED_API_KEY,
        })
    })
    .beforeEach(async (t) => {
        // Initialize Evinced SDK
        evinced = new EvincedSDK(t);
        // Start the Evinced engine
        await evinced.evStart();
    })
    .afterEach(async (t) => {
        const issues = await evinced.evAnalyze()
        console.log("evSafeFile")
        await evinced.evSaveFile(issues, 'html', './evReports/evincedTest.html');

    });

test("Demo page. Single page analyze", async (t) => {
    // Example action to verify we are on the correct page
    await t
        .expect(ClientFunction(() => document.title)())
        .eql("Home | Evinced, Demo site");
});