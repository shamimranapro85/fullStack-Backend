const res_error_handller = (res, { status_code = 500, message = "Faild" }) => {
  res.status(status_code).json({ status_code, message });
};



const res_success_handller = (
  res,
  { status_code = 200, message = "successfull", payLoad = {} } = {}
) => {

  try {
    res.status(status_code).json({ status_code, message, payLoad });
  } catch (error) {
    throw error
  } 
};

module.exports = { res_error_handller, res_success_handller };
