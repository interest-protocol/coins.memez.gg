export interface DraggableInputProps {
  advice?: string;
  validTypes: ReadonlyArray<string>;
  setFileUrl: (url: string) => void;
  onFailure?: (message: string) => void;
}
