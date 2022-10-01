
function saveToLocalStorage() {
	if (confirm('Do you want to save the current tracker state?\nThis will overwrite any previously saved tracker states.') == true) {
		var sessionKeys = Object.keys(sessionStorage);

		if (localStorage.getItem(KEY_PREFIX)) {
			localStorage.removeItem(KEY_PREFIX);
		}

		var toLocal = {};
		toLocal[KEY_PREFIX] = {};

		for (key in sessionKeys) {
			if (sessionKeys[key].startsWith(KEY_PREFIX)) {
				toLocal[KEY_PREFIX][sessionKeys[key]] = sessionStorage.getItem(sessionKeys[key]);
			}
		}

		localStorage.setItem(KEY_PREFIX, JSON.stringify(toLocal));
	}
}

function restoreFromLocalStorage() {
	if (localStorage.getItem(KEY_PREFIX)) {
		if (confirm('Do you want to restore the saved tracker state?\nThis will overwrite the existing state.') == true) {
			var sessionKeys = Object.keys(sessionStorage);
			for (key in sessionKeys) {
				if (sessionKeys[key].startsWith(KEY_PREFIX)) {
					sessionStorage.removeItem(sessionKeys[key]);
				}
			}
			var localJSON = JSON.parse(localStorage.getItem(KEY_PREFIX));
			var localKeys = Object.keys(localJSON[KEY_PREFIX]);
			for (key in localKeys) {
				sessionStorage.setItem(localKeys[key], localJSON[KEY_PREFIX][localKeys[key]]);
			}
			pageInit();
		}
	} else {
		alert('No saved data to restore.');
	}
}

function clearLocalStorage() {
	if (localStorage.getItem(KEY_PREFIX) && 
		confirm('Do you want to clear the saved tracker state?\nThis will not affect the current tracker state.') == true) {
		localStorage.removeItem(KEY_PREFIX);
	}
}

function toggleStorageOptions() {
	if (document.querySelector('.local_storage').style.display == 'none') {
		document.getElementById('toggle_local_storage').textContent = '[Hide Save Options]';
		document.getElementById('toggle_local_storage').title = 'Hide options to Save/Load/Restore tracker state';
		var buttons = document.getElementsByClassName('local_storage');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.display = '';
		}
	} else {
		document.getElementById('toggle_local_storage').textContent = '[Show Save Options]';
		document.getElementById('toggle_local_storage').title = 'Show options to Save/Load/Restore tracker state';
		var buttons = document.getElementsByClassName('local_storage');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.display = 'none';
		}
	}
}
