const usecases = require("../usecases/usecases");
const ApiResponse = require("../model/response");
const ERRORS = require("../constants/errors");
const RESP = require("../constants/response_constants");
const STR = require("../constants/string");

// GET all data
exports.getAll = (req, res) => {
  try {
    const status = req.query.status;
    const data = usecases.getAllData(status);
    res.json(new ApiResponse({ data }));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};

// GET data by id
exports.getById = (req, res) => {
  try {
    const uuid = req.params.id;
    if (!uuid)
      return res
        .status(400)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.ID_REQUIRED,
          })
        );
    const data = usecases.getDataById(uuid);
    if (!data) {
      return res
        .status(404)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.DATA_NOT_FOUND,
          })
        );
    }
    res.json(new ApiResponse({ data }));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};

// POST create data
exports.create = (req, res) => {
  try {
    const { nama, kelas, role, createdBy } = req.body;
    if (!nama || !kelas || !role) {
      return res.status(400).json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.FIELDS_REQUIRED,
        })
      );
    }
    const newData = usecases.addData(nama, kelas, role, createdBy);
    res.status(201).json(
      new ApiResponse({
        message: RESP.DATA_ADDED,
        data: newData,
      })
    );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};

// PUT update data
exports.update = (req, res) => {
  try {
    const uuid = req.params.id;
    const { nama, kelas, role, updatedBy } = req.body;
    if (!uuid)
      return res
        .status(400)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.ID_REQUIRED,
          })
        );
    if (!nama || !kelas || !role) {
      return res.status(400).json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.FIELDS_REQUIRED,
        })
      );
    }
    const updated = usecases.updateData(uuid, { nama, kelas, role, updatedBy });
    if (!updated) {
      return res
        .status(404)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.DATA_NOT_FOUND,
          })
        );
    }
    res.json(
      new ApiResponse({
        message: RESP.DATA_UPDATED,
        data: updated,
      })
    );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};

// PATCH ubah status ACTIVE/INACTIVE
exports.setStatus = (req, res) => {
  try {
    const uuid = req.params.id;
    const { status } = req.body;
    if (!uuid || !status)
      return res.status(400).json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.STATUS_REQUIRED,
        })
      );
    if (status !== STR.ACTIVE && status !== STR.INACTIVE)
      return res.status(400).json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.STATUS_INVALID,
        })
      );
    const updated = usecases.setStatus(uuid, status);
    if (!updated) {
      return res
        .status(404)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.DATA_NOT_FOUND,
          })
        );
    }
    res.json(new ApiResponse({ message: RESP.STATUS_CHANGED, data: updated }));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};

// DELETE remove data
exports.remove = (req, res) => {
  try {
    const uuid = req.params.id;
    if (!uuid)
      return res
        .status(400)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.ID_REQUIRED,
          })
        );
    const deleted = usecases.removeData(uuid);
    if (!deleted) {
      return res
        .status(404)
        .json(
          new ApiResponse({
            success: RESP.FAILURE,
            message: ERRORS.DATA_NOT_FOUND,
          })
        );
    }
    res.json(new ApiResponse({ message: RESP.DATA_DELETED }));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse({
          success: RESP.FAILURE,
          message: ERRORS.INTERNAL_ERROR,
        })
      );
  }
};
