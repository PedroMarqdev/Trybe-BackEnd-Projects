USE SpotifyClone;

DELIMITER $$

CREATE FUNCTION `quantidade_musicas_no_historico`(username VARCHAR(10))
RETURNS INT READS SQL DATA
BEGIN
DECLARE musicCount INT;
SELECT COUNT(*) FROM playback_list AS p
INNER JOIN users AS u ON
p.user_id = u.user_id
WHERE user_name = "Bill"
GROUP BY u.user_id
INTO musicCount;
RETURN musicCount;
END $$

DELIMITER ;
