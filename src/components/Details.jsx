import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Details = ({details}) => {
  useEffect(() => {

  }, [details])
  if (!details || Object.keys(details).length === 0) {
    return <div>Upload an Aadhaar image to scan its details.</div>; 
  }
  return (
    <div className="w-full h-3/4 bg-gray-100 rounded-md  gap-3">
      <div className="flex">
        <div className="w-1/2 h-[160px]  p-4 flex flex-col  gap-5">
          <TextField
            fullWidth
            id="standard-read-only-input"
            label="Aadhaar Number"
            defaultValue={details?.aadharNumber || 'N/A'}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            fullWidth
            id="standard-read-only-input"
            label="Date of Birth"
            defaultValue={details?.dob || 'N/A'}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </div>
        <div className="w-1/2 h-[160px]  p-4 flex flex-col gap-5">
          <TextField
            fullWidth
            id="standard-read-only-input"
            label="Name on Aadhaar"
            defaultValue={details?.name || "N/A"}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            fullWidth
            id="standard-read-only-input"
            label="Gender"
            defaultValue={details?.gender || 'N/A'}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </div>
      </div>

      <div className="w-full h-[100px]  px-5 flex flex-col gap-5">
        <TextField
          fullWidth
          id="standard-read-only-input"
          label="Address *"
          defaultValue={details?.address || 'N/A'}
          variant="standard"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <div className="w-1/2 ">
          <TextField
            fullWidth
            id="standard-read-only-input"
            label="PIN"
            defaultValue={details?.pin || 'N/A'}
            variant="standard"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
