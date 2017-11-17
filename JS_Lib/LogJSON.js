
/**
 * Converts an object to a JSON string
 * @param {object} obj The object to convert to a JSON string
 * @return {string} The JSON string formatted with a spacing of \t
*/
function convertJSONToString(obj) {
	return JSON.stringify(obj, null, "\t");
}

/**
 * Check if a key exists in object
 * @param {object} obj The object to check for a key
 * @param {object} key The key to check
 * @return {boolean} Result of checking for the key
*/
function checkKeyExists(obj, key) {
	return (key in obj)
}

/**
 * Add a key/value to an object
 * @param {object} obj The object to check for a key
 * @param {object} key The key to check
 * @param {object} value The value to add for the supplied key
*/
function addKey(obj, key, value) {
	if (!checkKeyExists(obj, key)) {
		obj[key] = value;
	}
}

/**
 * Add a key to the supplied object
 * @param {object} obj The object to check for a key
 * @param {object} key The key to check
 * @param {object} value The value to add for the supplied key
*/
function addKeyToObj(obj, key, value) {
	addKey(obj, key, value);
}

/**
 * Add the date and time time elements to the supplied object
 * @param {object} obj The object to add an element to
 * @param {object} date The date element
 * @param {object} time The time element
*/
function addDateDetails(obj, date, time) {
	addKeyToObj(obj, "date", date);
	addKeyToObj(obj, "time", time);
}

/**
 * Add the test details elements to the supplied object
 * @param {object} obj The object to add an element to
 * @param {object} testName The name of the test
 * @param {object} testStartTime The start time of the test
 * @param {object} testSuite The suite name of the test
 * @param {object} testEnv The environment the test is run in
 * @param {object} testRunMachine The machine name the test ran on
*/
function addTestDetails(obj, testName, testStartTime, testSuite, testEnv, testRunMachine) {
	var testDetailsObj = {};
	addKeyToObj(testDetailsObj, "Name", testName);
	addKeyToObj(testDetailsObj, "StartTime", testStartTime);
	addKeyToObj(testDetailsObj, "Suite", testSuite);
	addKeyToObj(testDetailsObj, "Env", testEnv);
	addKeyToObj(testDetailsObj, "RunMachine", testRunMachine);

	obj["testDetails"] = testDetailsObj;	
}

/**
 * Add the log message details elements to the supplied object
 * @param {object} obj The object to add an element to
 * @param {object} message The log message
*/
function addLogDetails(obj, message) {	
	var messageObj = {};
	addKeyToObj(messageObj, "Message", message);
	
	obj["logDetails"] = messageObj;
}

/**
 * Create the initial logging object
 * @constructor {object} Create the initial logging object
 * @param {object} logMessage The log message
 * @param(object) addTestDetailsFlag Flag to indicate if additional test env params are logged
*/
function createLogJsonObject(logMessage, addTestDetailsFlag) {
	// create the logging object
	var logObj = {};

	// add the testDetails and logDetails elements
	addKeyToObj(logObj, "logDetails", null);

	// set the date details
	addDateDetails(logObj, tags["SYSTEM/CURRENT_DATE"], tags["SYSTEM/CURRENT_TIME"]);

	// set the test details
	if (addTestDetailsFlag == "true") {
		addKeyToObj(logObj, "testDetails", null);
		addTestDetails(logObj, tags["TEST/NAME"], tags["TEST/START_TIME"], tags["SUITE/NAME"], tags["ENVIRONMENT/NAME"], tags["SYSTEM/HOST_NAME"]);
	}
	// set the log details
	addLogDetails(logObj, logMessage);
	
	return logObj;
}

/**
 * Set the tag jsonLogStr from the logging object created.
 * @param {object} obj The logging object
*/
function setLoggingTag(obj, tagName) {
	// set the tag to the JSON string
	tags[tagName] = convertJSONToString(obj);
}