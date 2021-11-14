const { verifyUser } = require("../middleware/auth");

const RecruiterProfileRoute = (router, RecruiterProfile) => {
  
  /**
   * @api {post} /api/recruiter/create Create a recruiter profile
   */
   router.post(`/recruiter/create`, (req, res) => {
    RecruiterProfile.create({
      email: req.body.email,
    }).then((ret) => res.json(ret));
  });
};

module.exports = RecruiterProfileRoute;
