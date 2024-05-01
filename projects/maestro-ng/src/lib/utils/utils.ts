
export function base64ToBlob(base64str: string, contentType: string): Blob {

  // decode base64 string, remove space for IE compatibility
  const binary = atob(base64str.replace(/\s/g, ''));

  // get binary length
  const len = binary.length;

  // create ArrayBuffer with binary length
  const buffer = new ArrayBuffer(len);

  // create 8-bit Array
  const view = new Uint8Array(buffer);

  // save unicode of binary data into 8-bit Array
  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }

  // create the blob object with content-type
  return new Blob( [view], { type: contentType });
}

export function downloadBlob(arquivoNome: string, arquivoConteudo: Blob): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(arquivoConteudo);
  a.download = arquivoNome;
  a.click();
}

export function downloadUrl(arquivoNome: string, url: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = arquivoNome;
  a.click();
}

export function stringToBlob(texto: string, contentType: string): Blob {
  return new Blob([texto], { type: contentType });
}

export function blobToString(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (evt) => {
      reject(evt);
    };
    reader.readAsText(blob);
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (evt) => {
      reject(evt);
    };
    reader.readAsDataURL(blob);
  });
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}
