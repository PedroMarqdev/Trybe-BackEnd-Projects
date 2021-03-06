CREATE VIEW cancoes_premium AS
SELECT 
s.song_name AS nome,
COUNT(s.song_id) AS reproducoes
FROM SpotifyClone.users AS u
INNER JOIN SpotifyClone.plans AS p ON
u.plan_id = p.plan_id
INNER JOIN SpotifyClone.playback_list AS pl ON
u.user_id = pl.user_id
INNER JOIN SpotifyClone.songs AS s ON
s.song_id = pl.song_id
WHERE p.plan_id IN (2,3)
GROUP BY s.song_id
ORDER BY `nome`;
