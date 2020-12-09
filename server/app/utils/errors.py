def format_errors(errors):
    errList = []
    for error in errors:
        if errors[error][0] == 'Not a valid choice':
            if error == 'band_id':
                errList += ["Please select a valid band"]
                continue
        errList += errors[error]
    return errList