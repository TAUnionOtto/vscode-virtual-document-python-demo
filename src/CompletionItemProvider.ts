import * as vscode from 'vscode';

import PythonTextDocumentContentProvider from './PythonTextDocumentContentProvider';

export default class CompletionItemProvider implements vscode.CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ) {
    PythonTextDocumentContentProvider.setVirtualDocument(document);
    const originalUri = document.uri.toString();
    const decodedUri = decodeURIComponent(originalUri);
    const virtualDocUriString = `vscode-notebook://python/${encodeURIComponent(decodedUri)}.py`;
    const virtualDocUri = vscode.Uri.parse(virtualDocUriString);
    const items = await vscode.commands.executeCommand<vscode.CompletionList>(
      'vscode.executeCompletionItemProvider',
      virtualDocUri,
      position,
      context.triggerCharacter,
    );
    return items;
  }
}
