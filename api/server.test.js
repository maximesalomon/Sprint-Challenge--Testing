const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

describe("route handlers", () => {
    
  afterEach(async () => {
    await db("games").truncate();
    await db.seed.run();
  });

  describe("GET /games", () => {
    it("returns a status code of 200", async () => {
      const res = await request(server).get("/games");

      expect(res.status).toBe(200);
    });

    it("should return a games array", async () => {
      const response = await request(server).get("/games");

      expect(response.body.games).toEqual([
        { id: 1, title: "Madden NFL 19", genre: "sport", releaseYear: 2018 },
        { id: 2, title: "Fortnite", genre: "fps", releaseYear: 2017 },
        { id: 3, title: "Red Dead Redemption 2", genre: "aventure", releaseYear: 2018 }
      ]);
    });

    it("returns an empty array even if no games", async () => {
      await db("games").truncate();
      const res = await request(server).get("/games");
      const games = res.body.games;
      expect(games.length).toBeFalsy();
    });
  });

  describe("POST /games", () => {
    it("recieves a 201 status", async () => {
      const game = { title: "Battlefield V", genre: "fps", releaseYear: 2018 };
      const body = { game };
      const res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(201);
    });

    it("recieves a 422 status for incomplete game data", async () => {
      const game = { title: "Far Cry New Dawns", genre: "", releaseYear: 2019 };
      const body = { game };
      const res = await request(server)
        .post("/games")
        .send(body);

      expect(res.status).toBe(422);
    });

    it("response is in json format", async () => {
      const game = { title: "Battlefield V", genre: "fps", releaseYear: 2018 };
      const body = { game };
      const res = await request(server)
        .post("/games")
        .send(body);

      expect(res.type).toMatch(/json/i);
    });
  });
});