import * as vscode from 'vscode';

import PythonTextDocumentContentProvider from './PythonTextDocumentContentProvider';

export default class HoverProvider implements vscode.HoverProvider {
  async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
  ): Promise<vscode.Hover | undefined> {
    PythonTextDocumentContentProvider.setVirtualDocument(document);
    const originalUri = document.uri.toString();
    const decodedUri = decodeURIComponent(originalUri);
    const virtualDocUriString = `vscode-notebook://python/${encodeURIComponent(decodedUri)}.py`;
    const virtualDocUri = vscode.Uri.parse(virtualDocUriString);
    const items = await vscode.commands.executeCommand<vscode.Hover[]>(
      'vscode.executeHoverProvider',
      virtualDocUri,
      position,
    );
    return items?.[0];
  }
}
