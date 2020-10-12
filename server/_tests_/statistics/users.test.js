const request = require("supertest");
const app = require("../../app");




//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User } = require("../../models");
const challenges = require("./mocks/challenges");
const submissions = require("./mocks/submissions");
const users = require("./mocks/users");

//mock data

describe("users tests", () => {
    beforeAll(async () => {
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);

      // cleaning all tables
      await Challenge.destroy({ truncate: true, force: true });
      await Submission.destroy({ truncate: true, force: true });
      await User.destroy({ truncate: true, force: true });

      //inserting mock data
      const challengesRes = await Challenge.bulkCreate(challenges);
      expect(challengesRes.length).toBe(3);
      const submissionsRes = await Submission.bulkCreate(submissions);
      expect(submissionsRes.length).toBe(6);
      const userRes = await User.bulkCreate(users);
      expect(userRes.length).toBe(3);
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it("can get all top-users by theirs submitting amount", async () => {
      const { body } = await request(app).get("/api/v1/statistics/users/top-users").expect(200);

      expect(body.length).toBe(2)
      expect(body[0].id).toBe(1)
      expect(body[0].User.userName).toBe(users[0].userName)
      expect(body[0].countSub).toBe(2)
      expect(body[1].id).toBe(3)
      expect(body[1].User.userName).toBe(users[2].userName)
      expect(body[1].countSub).toBe(1)
    })



    it("Can Get User Succeed Challenges", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/user-success").expect(200);
  
    expect(body[0].User.id).toBe(1)
    expect(body[0].User.userName).toBe(users[0].userName)
    expect(body[0].state).toBe("SUCCESS")
    expect(body[0].CountByUserID).toBe(2)
    })
   
    it("Can Get The User Challenges Has Beend Done in the last 5 days", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/sub-by-date").expect(200);
    

    expect(body[0][0].CountSubByDate).toBe(1)
    expect(new Date(body[0][0].createdAt).getTime()).toBeGreaterThan(Date.now() - 432000000)
    expect(body[0][1].CountSubByDate).toBe(1)
    expect(new Date(body[0][1].createdAt).getTime()).toBeGreaterThan(Date.now() - 432000000)
    })
   
    it("can Sub Users By Type", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/sub-by-type").expect(200);
    
    expect(body.length).toBe(2)
    expect(body[0].id).toBe(1)
    expect(body[0].userId).toBe(submissions[0].userId)
    expect(body[0].state).toBe("SUCCESS")
    expect(body[0].Challenge.id).toBe(1)
    expect(body[0].Challenge.type).toBe(challenges[0].type)
    expect(body[1].id).toBe(4)
    expect(body[1].userId).toBe(1)
    expect(body[1].state).toBe(submissions[0].state)
    expect(body[1].Challenge.id).toBe(2)
    expect(body[1].Challenge.type).toBe(challenges[1].type)
    })    

    it("can get User Unsolved Challenges", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/unsolved-challenges").expect(200);
    expect(body.length).toBe(2)

    expect(body[0].name).toBe(challenges[1].name)
    expect(body[0].type).toBe(challenges[1].type)
    })

  });
  