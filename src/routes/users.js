const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/isAuth");
const userAdmin = require("../middlewares/isAdmin");

const { getUsers, getUser, updateUser, deleteUser, addUser, loginUser } = require("../controllers/usersController");
const { userValidationPostRules, userValidationPutRules } = require("../validation/userRules");

// ein get auf alle Users ist nun nur noch dem Admin möglich, dem controller, wurde eine middleware (userAdmin) vorgeschaltet
// diese middleware überprüft den mitgesandten tocken im cookie ob diese Information user - admin dort gespeichert wurde
router
  .route("/")
  .get(userAdmin, getUsers)
  .post(userValidationPostRules, addUser);


// ein get/ delete und put ist nur noch dem eingeloggten Nutzer möglich
// bevor der Nutzer in den jeweiligen controller kommt, wird die middleware userAuth durchlaufen. (siehe ordner middleware/ userAuth)
router
  .route("/:id")
  .get(userAuth, getUser)
  .delete(userAuth, deleteUser)
  .put(userAuth, userValidationPutRules, updateUser);

router.route("/login")
  .post(loginUser);


module.exports = router;
