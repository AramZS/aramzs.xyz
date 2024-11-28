# Loop through all files in the current directory
for file in *; do
  # Check if the file name contains a date string in the format YYYYMMDD
  if [[ $file =~ [0-9]{4}-([0-9]{2})-([0-9]{2}) ]]; then
    # Extract the date string
    date="${BASH_REMATCH[0]}"
	# Print the date string
	echo "$date"
	dateStruc="${BASH_REMATCH[1]}/${BASH_REMATCH[2]}"
	echo "$dateStruc"
    # Create a directory with the date string if it doesn't exist
    mkdir -p "$dateStruc"
    # Move the file into the directory
    mv "$file" "$dateStruc/"
  fi
done
