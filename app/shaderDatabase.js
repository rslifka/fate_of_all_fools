const logger = require('logger');
const i = require('itemDatabase.js');
const shader = require('shader.js');

class ShaderDB extends i.ItemDatabase {
	constructor() {
		super('shader');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new shader.Shader(data[0], data[1], data[2]));
	}
}

exports.shaderDB = new ShaderDB();
