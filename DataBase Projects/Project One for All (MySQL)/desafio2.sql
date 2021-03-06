CREATE VIEW `estatisticas_musicais` AS
SELECT
(SELECT COUNT(*) FROM SpotifyClone.songs) AS 'cancoes',
(SELECT COUNT(*) FROM SpotifyClone.album_list) AS 'albuns',
COUNT(*) AS 'artistas'
FROM SpotifyClone.artists;
