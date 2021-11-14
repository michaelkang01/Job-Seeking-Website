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
    ).then((ret) => res.json(ret));
  });

  /**
   * @api {post} /api/updategeneralcontact Update general contact information
   */
  router.post(`/updategeneralcontact`, [verifyUser], (req, res) => {
    JobseekerProfile.updateOne(
      { email: res.locals.authData.email },
      {
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName,
        email: req.body.profile.email,
        address: req.body.profile.address
      }
    ).then((ret) => res.json(ret));
  });

  /**
   * @api {post} /api/updatesocials Update social links
   */
   router.post(`/updatesocials`, [verifyUser], (req, res) => {
    JobseekerProfile.updateOne(
      { email: res.locals.authData.email },
      { socials: req.body.socials }
    ).then((ret) => res.json(ret));
  });
};

module.exports = updateProfileRoute;
