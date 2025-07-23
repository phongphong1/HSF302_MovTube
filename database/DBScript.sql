
CREATE TABLE [users] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [username] VARCHAR(50) UNIQUE,
  [first_name] NVARCHAR(255),
  [last_name] NVARCHAR(255),
  [email] VARCHAR(255),
  [password_hash] VARCHAR(255),
  [registration_date] DATETIME
);

CREATE TABLE [movies] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [title] NVARCHAR(255),
  [year] INT,
  [synopsis] TEXT,
  [duration_minutes] INT,
  [poster_url] VARCHAR(255),
  [average_rating] DECIMAL(3, 2),
  [total_episodes] INT
);

CREATE TABLE [people] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(255),
  [biography] TEXT
);

CREATE TABLE [genres] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(100)
);

CREATE TABLE [roles] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(100)
);

CREATE TABLE [socials] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [name] NVARCHAR(100)
);

CREATE TABLE [notifications] (
  [id] INT IDENTITY(1,1) PRIMARY KEY,
  [type] NVARCHAR(20),
  [message] TEXT
);

CREATE TABLE [liked_movies] (
  [movie_id] INT,
  [user_id] INT,
  PRIMARY KEY ([movie_id], [user_id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [movie_actors] (
  [movie_id] INT,
  [person_id] INT,
  PRIMARY KEY ([movie_id], [person_id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([person_id]) REFERENCES [people]([id]) ON DELETE CASCADE
);

CREATE TABLE [movie_directors] (
  [movie_id] INT,
  [person_id] INT,
  PRIMARY KEY ([movie_id], [person_id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([person_id]) REFERENCES [people]([id]) ON DELETE CASCADE
);

CREATE TABLE [movie_genres] (
  [movie_id] INT,
  [genre_id] INT,
  PRIMARY KEY ([movie_id], [genre_id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([genre_id]) REFERENCES [genres]([id]) ON DELETE CASCADE
);

CREATE TABLE [history] (
  [movie_id] INT,
  [user_id] INT,
  [is_completed] BIT,
  [watch_time] DATETIME DEFAULT GETDATE(),
  [progress_seconds] INT,
  PRIMARY KEY ([movie_id], [user_id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);
GO

CREATE TRIGGER trg_history_update_watch_time
ON [history]
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE h
  SET watch_time = GETDATE()
  FROM [history] h
  INNER JOIN inserted i ON h.movie_id = i.movie_id AND h.user_id = i.user_id;
END;
GO

CREATE TABLE [user_role] (
  [role_id] INT,
  [user_id] INT,
  PRIMARY KEY ([role_id], [user_id]),
  FOREIGN KEY ([role_id]) REFERENCES [roles]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [linked_social] (
  [social_id] INT,
  [user_id] INT,
  [social_user_id] VARCHAR(255),
  PRIMARY KEY ([social_id], [user_id]),
  FOREIGN KEY ([social_id]) REFERENCES [socials]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [user_notifications] (
  [user_id] INT,
  [noti_id] INT,
  [is_read] BIT,
  [create_at] DATETIME,
  PRIMARY KEY ([user_id], [noti_id]),
  FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE,
  FOREIGN KEY ([noti_id]) REFERENCES [notifications]([id]) ON DELETE CASCADE
);

CREATE TABLE [episodes] (
  [id] INT,
  [movie_id] INT,
  [url] VARCHAR(255),
  [order_number] INT,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([movie_id]) REFERENCES [movies]([id]) ON DELETE CASCADE
);

