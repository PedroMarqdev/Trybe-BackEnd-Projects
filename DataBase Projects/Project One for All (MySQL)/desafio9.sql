DELIMITER $$

CREATE PROCEDURE albuns_do_artista(IN nome VARCHAR(25))
BEGIN
SELECT
CONCAT(a.first_name, ' ', a.last_name) AS 'artista',
al.album_name AS 'album'
FROM SpotifyClone.album_list AS al
INNER JOIN SpotifyClone.artists AS a ON
a.artist_id = al.artist_id
WHERE CONCAT(a.first_name, ' ', a.last_name) = nome;
END $$

DELIMITER ;
