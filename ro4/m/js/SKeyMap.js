/**
 * Extended Map class whose 'key' is forced as string.
 */
class SKeyMap extends Map {

	/**
	 * Constructor.
	 */
	constructor () {
		super();
	}

	/**
	 * Removes the specified element from a Map object by key.
	 * @param {string} key The key of the element to remove from the Map object.
	 * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
	 */
	delete (key) {
		return super.delete("" + key);
	}

	/**
	 * Returns a specified element from a Map object.
	 * @param {string} key The key of the element to return from the Map object.
	 * @returns The element associated with the specified key, or undefined if the key can't be found in the Map object.
	 */
	get (key) {
		return super.get("" + key);
	}

	/**
	 * Returns a boolean indicating whether an element with the specified key exists or not.
	 * @param {string} key The key of the element to test for presence in the Map object.
	 * @returns true if an element with the specified key exists in the Map object; otherwise false.
	 */
	has (key) {
		return super.has("" + key);
	}

	/**
	 * Adds or updates an entry in a Map object with a specified key and a value.
	 * @param {string} key The key of the element to add to the Map object.
	 * @param {any} value The value of the element to add to the Map object.
	 * @returns The Map object.
	 */
	set (key, value) {
		return super.set("" + key, value);
	}
}