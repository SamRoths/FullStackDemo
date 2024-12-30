import React from 'react'

export default function DisplayEditText({
  data={},
  dataToString=(dict)=>{return String(dict)},
  title='', 
  subtitles=null,
  onSubmit = ()=>{}}) {
  return (
    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
      <InputLabel  htmlFor="standard-adornment-max-price">Maximum Gift Price</InputLabel>
        <Input
          error = {this.state.maxPriceIsInvalid}
          helperText = {this.state.maxPriceHelperText}
          label = "Maximum Gift Price"
          id="standard-adornment-max-price"
          name="maxPrice"
          placeholder="Unspecified"
          required = {false}
          value = {this.props.groups[this.props.groupIndex].recommended_price_max/100}
          type="number"
          inputProps={{
          step: 0.01,
          }}
          onChange = {this.onChange}
          startAdornment={
            <InputAdornment position="start">
              $
            </InputAdornment>
          }
          endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    "click me"
                  }
                  onClick={this.handleClick}
                  edge="end"
                >
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            }
          disabled={this.state.displayMode}
          sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            
          />
          <FormHelperText error >{this.state.maxPriceHelperText}</FormHelperText>
        </FormControl>
  )
}
