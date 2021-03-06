CREATE VIEW top_3_artistas AS
SELECT 
CONCAT(a.first_name, ' ', a.last_name) AS 'artista',
COUNT(f.artist_id) AS  'seguidores'
FROM follow_list AS f
INNER JOIN artists AS a ON
f.artist_id = a.artist_id
GROUP BY `artista`
ORDER BY `seguidores`DESC, `artista`
LIMIT 3;
