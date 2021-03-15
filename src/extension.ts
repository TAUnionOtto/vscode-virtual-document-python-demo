import * as vscode from 'vscode';

import PythonTextDocumentContentProvider from './PythonTextDocumentContentProvider';
import CompletionItemProvider from './CompletionItemProvider';
import HoverProvider from './HoverProvider';

export function activate(context: vscode.ExtensionContext) {
  // Choose 'vscode-notebook' from https://github.com/microsoft/vscode-python/blob/main/src/client/common/constants.ts#L8，
  vscode.workspace.registerTextDocumentContentProvider('vscode-notebook', new PythonTextDocumentContentProvider());
  vscode.languages.registerCompletionItemProvider('markdown', new CompletionItemProvider(), '.');
  vscode.languages.registerHoverProvider('markdown', new HoverProvider());
}
