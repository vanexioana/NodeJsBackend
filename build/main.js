require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(/*! express */ "express");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const cors = __webpack_require__(/*! cors */ "cors");

const path = __webpack_require__(/*! path */ "path");

const sequelize = __webpack_require__(/*! ./sequelize */ "./src/sequelize.js").sequelize;

const FavouriteList = __webpack_require__(/*! ./models/FavouriteLists */ "./src/models/FavouriteLists.js");

const Video = __webpack_require__(/*! ./models/Video */ "./src/models/Video.js");

const {
  Op
} = __webpack_require__(/*! sequelize */ "sequelize");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.get('/video', async (req, res) => {
  try {
    const videoList = await Video.findAll();
    res.status(200).json(videoList);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'internal server error'
    });
  }
});
app.get('/video/:vid', async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.vid);

    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({
        message: 'not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.post('/video', async (req, res) => {
  try {
    const video = req.body;
    await Video.create(video);
    res.status(201).json({
      message: 'created'
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.put('/video/:vid', async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.vid);

    if (video) {
      await video.update(req.body, {
        fields: ['description', 'title', 'url']
      });
      res.status(202).json({
        message: 'accepted'
      });
    } else {
      res.status(404).json({
        message: 'not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.delete('/video', async (req, res) => {
  try {
    const favouriteList = await FavouriteList.findByPk(req.params.vid);

    if (favouriteList) {
      await favouriteList.destroy();
      res.status(202).json({
        message: 'accepted'
      });
    } else {
      res.status(404).json({
        message: 'not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.get("/favouriteList", async (req, res) => {
  try {
    const {
      description,
      date,
      sortByDate,
      page
    } = req.query;
    const pageSize = 5;
    const currentOffset = page ? (page + 1) * pageSize : 0;
    const favouriteList = await FavouriteList.findAll({
      where: {
        [Op.or]: [description ? {
          description: {
            [Op.like]: description
          }
        } : undefined, date ? {
          date: {
            [Op.eq]: date
          }
        } : undefined]
      },
      order: sortByDate ? [[sortByDate, "ASC"]] : undefined,
      limit: 5,
      offset: currentOffset
    });
    res.status(200).json(favouriteList);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'internal server error'
    });
  }
});
app.get("/favouriteList/:lid/video", async (req, res) => {
  try {
    const list = await FavouriteList.findByPk(req.params.lid);

    if (list) {
      const video = await list.getVideos();
      res.status(200).json(video);
    } else {
      res.status(404).json({
        message: 'not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.get('/favouriteList/:lid/video/:vid', async (req, res) => {
  try {
    const favouriteList = await FavouriteList.findByPk(req.params.lid);

    if (favouriteList) {
      const videos = await favouriteList.getVideos({
        where: {
          id: req.params.cid
        }
      });
      const video = videos.shift();

      if (video) {
        res.status(200).json(video);
      } else {
        res.status(404).json({
          message: 'chapter not found'
        });
      }
    } else {
      res.status(404).json({
        message: 'book not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.post('/favouriteList/:lid/video/:vid', async (req, res) => {
  try {
    const list = await FavouriteList.findByPk(req.params.lid);

    if (list) {
      const video = req.body;
      video.listId = list.id;
      await Video.create(video);
      res.status(200).json({
        message: 'created'
      });
    } else {
      res.status(404).json({
        message: 'not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.put('/favouriteList/:lid/video/:vid', async (req, res) => {
  try {
    const list = await FavouriteList.findByPk(req.params.vid);

    if (list) {
      const videos = await list.getVideos({
        where: {
          id: req.params.vid
        }
      });
      const video = videos.shift();

      if (video) {
        await video.update(req.body);
        res.status(202).json({
          message: 'accepted'
        });
      } else {
        res.status(404).json({
          message: 'chapter not found'
        });
      }
    } else {
      res.status(404).json({
        message: 'book not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.delete('/favouriteList/:lid/video/:vid', async (req, res) => {
  try {
    const list = await FavouriteList.findByPk(req.params.vid);

    if (list) {
      const videos = await list.getVideos({
        where: {
          id: req.params.vid
        }
      });
      const video = videos.shift();

      if (video) {
        await video.destroy();
        res.status(202).json({
          message: 'accepted'
        });
      } else {
        res.status(404).json({
          message: 'chapter not found'
        });
      }
    } else {
      res.status(404).json({
        message: 'book not found'
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'some error occured'
    });
  }
});
app.listen(process.env.PORT, async () => {
  await sequelize.sync({
    alter: true
  });
});
/* WEBPACK VAR INJECTION */}.call(this, "src"))

/***/ }),

/***/ "./src/models/FavouriteLists.js":
/*!**************************************!*\
  !*** ./src/models/FavouriteLists.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const sequelize = __webpack_require__(/*! ../sequelize.js */ "./src/sequelize.js").sequelize;

const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

const Video = __webpack_require__(/*! ./Video */ "./src/models/Video.js");

const FavouriteList = sequelize.define('favourite_list', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [5],
        msg: "Minimum 5 characters required in description"
      }
    }
  },
  date: {
    type: Sequelize.DATE
  }
});
FavouriteList.hasMany(Video);
module.exports = FavouriteList;

/***/ }),

/***/ "./src/models/Video.js":
/*!*****************************!*\
  !*** ./src/models/Video.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

const sequelize = __webpack_require__(/*! ../sequelize.js */ "./src/sequelize.js").sequelize;

const Video = sequelize.define('video', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [5],
        msg: "Minimum 5 characters required in description"
      }
    }
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      min: {
        args: [5],
        msg: "Minimum 5 characters required in title"
      }
    }
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      is: {
        args: ["^https:\\/\\/www\\.[a-z]*\\.[a-z]*", 'i']
      }
    }
  }
});
module.exports = Video;

/***/ }),

/***/ "./src/sequelize.js":
/*!**************************!*\
  !*** ./src/sequelize.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

__webpack_require__(/*! dotenv */ "dotenv").config({});

let sequelize;

if (true) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
  });
} else {}

module.exports = {
  sequelize
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\parva\OneDrive\Desktop\node-vanesa\exam\src/index.js */"./src/index.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=main.map