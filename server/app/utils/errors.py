def format_errors(errors):
    errList = []
    for error in errors:
        errList += errors[error]
    return errList