import * as vscode from 'vscode';

import Note from './Note';

export default class PythonTextDocumentContentProvider implements vscode.TextDocumentContentProvider {
  static virtualDocumentContents = new Map<string, string>();

  static setVirtualDocument(document: vscode.TextDocument) {
    const decodedUri = decodeURIComponent(document.uri.toString());
    PythonTextDocumentContentProvider.virtualDocumentContents.set(
      decodedUri,
      Note.buildCodeContent(document, 'PYSPARK'),
    );
  }

  provideTextDocumentContent(uri: vscode.Uri) {
    const originalUri = uri.path.slice(1).slice(0, -3);
    const decodedUri = decodeURIComponent(originalUri);
    return PythonTextDocumentContentProvider.virtualDocumentContents.get(decodedUri);
  }
}
