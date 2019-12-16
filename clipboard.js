const { clipboard } = require("electron");
const { EventEmitter } = require("events");
const clipboardEmitter = new EventEmitter();

const watchFrequency = 500;

let watcherId = null,
	previousText = clipboard.readText(),
	previousImage = clipboard.readImage();

clipboard.on = (event, listener) => {
	clipboardEmitter.on(event, listener);
	return clipboard;
};

clipboard.off = (event, listener) => {
	if (listener) clipboardEmitter.removeListener(event, listener);
	else clipboardEmitter.removeAllListeners(event);
	return clipboard;
};

clipboard.startWatching = () => {
	if (!watcherId)
		watcherId = setInterval(() => {
			if (isDiffText(previousText, (previousText = clipboard.readText())))
				clipboardEmitter.emit("text-copied", previousText);
			if (isDiffImage(previousImage, (previousImage = clipboard.readImage())))
				clipboardEmitter.emit("image-copied", previousImage);
		}, watchFrequency);
	return clipboard;
};

clipboard.stopWatching = () => {
	if (watcherId) clearInterval(watcherId);
	watcherId = null;
	return clipboard;
};

function isDiffText(str1, str2) {
	return str2 && str1 !== str2;
}

function isDiffImage(img1, img2) {
	return !img2.isEmpty() && img1.toDataURL() !== img2.toDataURL();
}

module.exports = clipboard;
