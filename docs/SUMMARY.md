# Table of contents

* [Hi Bumblebee!](./README.md)

## Install Bumblebee

* [Install via Docker](install-bumblebee/install-via-docker.md)
* [Build and Install From Source](install-bumblebee/build-and-install-from-source.md)

## Quick start

* [Setting up your first workspace](quick-start/setup-workspace.md)

## Bumblebee interface

* [Loading a Dataset](bumblebee-interface/loading-a-dataset.md)
* [Saving a Dataset](bumblebee-interface/saving-a-dataset.md)
* [Profile](bumblebee-interface/profile.md)
* [Table](bumblebee-interface/table.md)
* [Columns](bumblebee-interface/columns.md)

## Transformations

* Join
  * [Join dataframes](transformation/join.md)
  * [Concatenate Dataframes](transformation/concat.md)
  * [Aggregate](transformation/aggregations.md)
* Rows functions
  * [Sort rows](transformation/sortRows.md)
  * [Filter rows](transformation/filterRows.md)
  * [Drop empty rows](transformation/dropEmptyRows.md)
  * [Drop duplicates](transformation/dropDuplicates.md)
* Column managing functions
  * [Set](transformation/set.md)
  * [Rename](transformation/rename.md)
  * [Duplicate](transformation/duplicate.md)
  * [Keep](transformation/keep.md)
  * [Drop](transformation/drop.md)
  * [Nest](transformation/nest.md)
  * [Unnest](transformation/unnest.md)
* Transformation functions
  * [Fill null values](transformation/fill_na.md)
  * [Replace](transformation/replace.md)
  * String functions
    * [Lower case](transformation/lower.md)
    * [Upper case](transformation/upper.md)
    * [Proper case](transformation/proper.md)
    * [Remove accents](transformation/normalize_chars.md)
    * [Remove special chars](transformation/remove_special_chars.md)
    * [Normalize white spaces](transformation/normalize_spaces.md)
    * [Left (substring)](transformation/left_string.md)
    * [Right (substring)](transformation/right_string.md)
    * [Mid (substring)](transformation/mid_string.md)
  * Math functions
    * [Absolute value](transformation/abs.md)
    * [Round](transformation/round.md)
    * [Floor](transformation/floor.md)
    * [Ceil](transformation/ceil.md)
    * [Modulo](transformation/mod.md)
    * [Logarithm](transformation/log.md)
    * [Natural logarithm](transformation/ln.md)
    * [Power](transformation/pow.md)
    * [Square root](transformation/sqrt.md)
  * Trigonometric functions
    * [Sine](transformation/sin.md)
    * [Cosine](transformation/cos.md)
    * [Tangent](transformation/tan.md)
    * [Inverse Sine](transformation/asin.md)
    * [Inverse Cosine](transformation/acos.md)
    * [Inverse Tangent](transformation/atan.md)
    * [Hyperbolic Sine](transformation/sinh.md)
    * [Hyperbolic Cosine](transformation/cosh.md)
    * [Hyperbolic Tangent](transformation/tanh.md)
    * [Inverse Hyperbolic Sine](transformation/asinh.md)
    * [Inverse Hyperbolic Cosine](transformation/acosh.md)
    * [Inverse Hyperbolic Tangent](transformation/atanh.md)
  * Time and Date
    * [Transform format](transformation/transformFormat.md)
    * [Year](transformation/date_extract_year.md)
    * [Year (short)](transformation/date_extract_yearShort.md)
    * [Month name](transformation/date_extract_month.md)
    * [Month name (short)](transformation/date_extract_monthShort.md)
    * [Month as a number](transformation/date_extract_monthNumber.md)
    * [Day of month](transformation/date_extract_day.md)
    * [Weekday](transformation/date_extract_weekday.md)
    * [Weekday (short)](transformation/date_extract_weekdayShort.md)
    * [Weekday as a number](transformation/date_extract_weekdayNumber.md)
    * [Minute](transformation/date_extract_hour.md)
    * [Hour (00-23)](transformation/date_extract_hour24.md)
    * [AM/PM](transformation/date_extract_ampm.md)
    * [UTC offset](transformation/date_extract_utc.md)
    * [Timezone](transformation/date_extract_timezone.md)
    * [Day number of year](transformation/date_extract_dayNumber.md)
    * [Weekday of year (Mon as 1st)](transformation/date_extract_weekNumberM.md)
    * [Weekday of year (Sun as 1st)](transformation/date_extract_weekNumberS.md)
  * Web related functions
    * [Domain](transformation/domain.md)
    * [Subdomain](transformation/subdomain.md)
    * [Url scheme](transformation/url_scheme.md)
    * [Port](transformation/port.md)
    * [Url path](transformation/url_path.md)
    * [Url params](transformation/url_params.md)
    * [Email domain](transformation/email_domain.md)
    * [Email username](transformation/email_username.md)
    * [Strip HTML](transformation/strip_html.md)
  * Machine Learning
    * [Random sampling](transformation/sample_n.md)


## Help
* [Bigger than memory data](help/bigger-than-memory-data.md)
* [Which engine to use](help/deciding-which-engine-to-use.md)
