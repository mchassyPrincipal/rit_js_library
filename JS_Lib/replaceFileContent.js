/**
 * Replace the content of a file.
 * @param {object} fileName The name of file to process
 * @param {object} searchText The search string
 * @param {object} replacementText The replacement string
*/
function replaceFileContent(fileName, searchText, replacementText) {
	
	try {
		// create a Java FILE object
		var file = new java.io.File(fileName);

		// create a Java SCANNER object - only valid for Java 1.7+
		var scanner = new java.util.Scanner(file).useDelimiter("\\Z");

		// get the file contents and amend
		var contents = scanner.next();
		var reg = new RegExp(searchText, "g");
		
		// get the count of the number of occurences found
		var foundCount = (contents.match(reg) || []).length;
		var updatedContents = contents.replace(reg, replacementText);

		// Re-Write the data to the file - we do not want to append so set 2nd param to FileWriter as false
		var fileWriter = new java.io.FileWriter(file, false);
		fileWriter.write(updatedContents);
		fileWriter.close();
		
		return "Successfully replaced " + foundCount + " occurences of text (" + searchText +") with (" + replacementText + ") in file " + file;
	} catch(err) {
		return "Failed replacing text (" + searchText +") with (" + replacementText + ") in file " + file + ". Error is: " + err;
	}
}