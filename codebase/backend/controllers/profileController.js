const { verifyUser } = require("../middleware/auth");

const updateProfileRoute = (router, JobseekerProfile) => {
  /**
   * @api {post} /api/updateprofileskills Update user skills
   */
  router.post(`/updateprofileskills`, [verifyUser], (req, res) => {
    JobseekerProfile.updateOne(
      { email: res.locals.authData.email },
      { skills: req.body.skills }
    ).then((ret) => res.json(ret));
  });

  /**
   * @api {post} /api/updateprofilesummary Update user summary
   */
  router.post(`/updateprofilesummary`, [verifyUser], (req, res) => {
    JobseekerProfile.updateOne(
      { email: res.locals.authData.email },
      { summary: req.body.summary }
    ).then((ret) => res.json(ret));
  });

  /**
   * @api {post} /api/updateworkexperiences Update user work experiences
   */
   router.post(`/updateworkexperiences`, [verifyUser], (req, res) => {
    JobseekerProfile.updateOne(
      { email: res.locals.authData.email },
      { workExperience: req.body.workExperience }
    ).then((ret) => {
      res.json(ret);
    });
  });
};

module.exports = updateProfileRoute;
