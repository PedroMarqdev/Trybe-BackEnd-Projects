CREATE VIEW top_2_hits_do_momento AS
SELECT 
s.song_name AS cancao,
COUNT(s.song_id) AS reproducoes
FROM SpotifyClone.playback_list AS p
INNER JOIN SpotifyClone.songs AS s ON
s.song_id = p.song_id
GROUP BY s.song_id
ORDER BY `reproducoes` DESC, s.song_name
LIMIT 2;
