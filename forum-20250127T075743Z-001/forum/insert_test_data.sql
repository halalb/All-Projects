-- Insert data into the tables

USE myForum;

-- Insert test data into topics table
INSERT INTO topics (title, description) VALUES ('Topic 1', 'Description for Topic 1'), ('Topic 2', 'Description for Topic 2');

-- Insert test data into users table
INSERT INTO users (name, email) VALUES ('User 1', 'user1@example.com'), ('User 2', 'user2@example.com');

-- Insert test data into posts table
INSERT INTO posts (content, userId, topicId) VALUES
  ('Post about Topic 1', 1, 1),
  ('Another post about Topic 1', 2, 1),
  ('Post about Topic 2', 1, 2);

INSERT INTO membership (iduser, idtopic) VALUES
  (1, 1),
  (2, 1),
  (1, 2);
