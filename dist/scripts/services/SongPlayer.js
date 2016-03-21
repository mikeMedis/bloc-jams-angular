(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};

		var currentAlbum = Fixtures.getAlbum();

		/* *
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		var getSongIndex = function(song){
			return currentAlbum.songs.indexOf(song);
		}

		/* *
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;

		/* *
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				stopSong();
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		}

		/* *
		* @function playSong
		* @desc Plays passed in song object
		* @param {Object} song
		*/
		function playSong(song){
			if (currentBuzzObject){
				currentBuzzObject.play();
				song.playing = true;
			}
		}

		/* *
		* @function stopSong
		* @desc stops playing song
		*/
		function stopSong(song){
			if (currentBuzzObject){
				currentBuzzObject.stop();
				song.playing = null;
			}
		}

		/* *
		* @function SongPlayer.play
		* @desc Method to start playing song
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/* *
		* @function SongPlayer.pause
		* @desc Method to pause the playing
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/* *
		* @function previous
		* @desc Selects previous song
		*/
		SongPlayer.previous = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0){
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/* *
		* @function Next
		* @desc Public method to select next song in album
		*/
		SongPlayer.next = function(){
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex > currentAlbum.songs.length){
				currentSongIndex = 0;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		return SongPlayer;
	}

	angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer);
})();
