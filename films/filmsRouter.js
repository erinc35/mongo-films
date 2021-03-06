const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  if(req.query.producer) {
    Film.find()
        .where({ producer: new RegExp(req.query.producer, "gi")})
        //.select('episode')
        .populate('characters', {edited: 0, created: 0, key: 0, __v: 0, homeworld_key: 0, homeworld: 0})
        .populate('planets', 'name climate terrain gravity diameter -_id') //better syntax
        .then(films => {
        res.status(200).json(films);
        })
        .catch(err => {
        res
            .status(500)
            .json([{ error: "The character information could not be retrieved." }]);
        });
    } else if (req.query.release_date) {
        Film.find()
          .where({
            release_date: new RegExp(req.query.release_date, "gi")
          })
          .populate("characters", {
            edited: 0,
            created: 0,
            key: 0,
            __v: 0,
            homeworld_key: 0,
            homeworld: 0
          })
          .populate("planets", "name climate terrain gravity diameter -_id")
          .then(films => {
        res.status(200).json(films);
        })
        .catch(err => {
        res
            .status(500)
            .json([{ error: "The character information could not be retrieved." }]);
        });
    } else {
        Film.find()
          .sort("episode")
          .populate("characters", {
            edited: 0,
            created: 0,
            key: 0,
            __v: 0,
            homeworld_key: 0,
            homeworld: 0
          })
          .populate("planets", "name climate terrain gravity diameter -_id") //better syntax
          .then(films => {
            res.status(200).json(films);
          })
          .catch(err => {
            res
              .status(500)
              .json([
                {
                  error:
                    "The character information could not be retrieved."
                }
              ]);
          });
    }
});

module.exports = router;
