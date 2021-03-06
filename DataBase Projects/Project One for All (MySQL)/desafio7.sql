CREATE VIEW perfil_artistas AS
SELECT
CONCAT(a.first_name, ' ', a.last_name) AS artista, 
al.album_name AS album,
COUNT(al.album_id) AS seguidores
FROM SpotifyClone.album_list AS al
INNER JOIN SpotifyClone.artists AS a ON
a.artist_id = al.artist_id
INNER JOIN SpotifyClone.follow_list AS f ON
a.artist_id = f.artist_id
GROUP BY al.album_id
ORDER BY `seguidores` DESC, `artista`, `album`;
