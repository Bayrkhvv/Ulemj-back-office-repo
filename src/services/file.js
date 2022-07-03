import axios from 'axios';
import mime from 'mime-types';
import { endsWith, replace } from 'lodash';

const FileService = {
  async download({ name, path }) {
    const response = await axios.get(path, { responseType: 'blob' });
    const mimeType = response.headers['content-type'];
    const blob = new Blob([response.data], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.resolveFileName(name, mimeType);
    link.click();
    URL.revokeObjectURL(link.href);
  },
  resolveFileName(name, mimeType) {
    const fileExtension = mime.extension(mimeType);
    if (fileExtension === false) {
      return name;
    }
    if (endsWith(name, fileExtension)) {
      return name;
    }
    return `${replace(name, /\s/g, '-')}.${fileExtension}`;
  },
};

export default FileService;
