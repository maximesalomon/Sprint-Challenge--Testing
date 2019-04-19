exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "Madden NFL 19", genre: "sport", releaseYear: 2018 },
        { title: "Fortnite", genre: "fps", releaseYear: 2017 },
        { title: "Red Dead Redemption 2", genre: "aventure", releaseYear: 2018 },
      ]);
    });
};