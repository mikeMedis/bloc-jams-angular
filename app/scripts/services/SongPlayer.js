(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};

		/**
		* @desc Buzz object for current album
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;
		};

		/**
		* @function playSong
		* @desc Plays passed in song object
		* @param {Object} song
		*/
		function playSong(song) {
			currentBuzzObject.play();
			song.playing = true;
		};


		/**
		* @function SongPlayer.play
		* @desc Method to start playing song
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (!song) {
				song = currentAlbum.songs[0];
				setSong(song);
			}

			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playsong(song);
				}
			}
		};

		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function playSong
		* @desc plays the current currentBuzzObject()
		* @param {Object} song
		*/


		return SongPlayer;
	}

	angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer);
})();
