import * as vscode from 'vscode';

const codeStartReg = new RegExp(/^(\s*)(`{3,}|~{3,})(python|sql|)\s+(PYSPARK|SPARK_SQL)(\s+[^`~]*)?$/);
const codeEndReg = new RegExp(/^(\s*)(`{3,}|~{3,})\s*$/);

export default class Note {
  static buildCodeContent(document: vscode.TextDocument, codeType: string): string {
    const blankedText: string[] = [];
    let inParagraph = false;
    for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
      const line = document.lineAt(lineNumber);
      if (Note.checkLineTypeIs(line.text, codeType)) {
        inParagraph = true;
        blankedText.push('');
        continue;
      }
      if (Note.checkIsCodeEnd(line.text)) {
        inParagraph = false;
        blankedText.push('');
        continue;
      }
      if (inParagraph) {
        blankedText.push(line.text);
        continue;
      }
      blankedText.push('');
    }
    return blankedText.join('\n');
  }

	static checkLineTypeIs(lineText: string, paragraphType: string) {
		const matches = codeStartReg.exec(lineText);
    if (matches === null) {
      return false;
    }
    if (matches[4] === undefined) {
      return false;
    }
    const type = matches[4];
    return type === paragraphType;
	}

	static checkIsCodeEnd(lineText: string) {
		return codeEndReg.test(lineText);
	}
}
